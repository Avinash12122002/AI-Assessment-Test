import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Sparkles,
  FileText,
  FileDown,
  CalendarIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import axios from "axios";
import { cn } from "@/lib/utils";

const generateUniqueId = (() => {
  let counter = 0;
  return () => {
    counter++;
    return Date.now() + counter;
  };
})();

export const AIQuizGenerator = ({
  testDetails,
  onQuestionsGenerated,
  onSettingsUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const [aiConfig, setAIConfig] = useState({
    topic: testDetails?.title || "",
    instructions: testDetails?.description || "",
    difficulty: "medium",
    questionCount: testDetails?.questionCount || 5,
    dueDate: testDetails?.dueDate || undefined,
    duration: testDetails?.duration || 30,
  });
  const [questions, setQuestions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = useCallback(
    (field, value) => {
      const newConfig = { ...aiConfig, [field]: value };
      setAIConfig(newConfig);

      if (onSettingsUpdated && (field === "dueDate" || field === "duration")) {
        const settingsUpdate = {
          dueDate: newConfig.dueDate,
          duration: newConfig.duration,
        };
        onSettingsUpdated(settingsUpdate);
      }
    },
    [aiConfig, onSettingsUpdated]
  );

  const createDefaultOptions = () => {
    return [
      { id: 1, text: "Programming languages", isCorrect: true },
      { id: 2, text: "Medical procedures", isCorrect: false },
      { id: 3, text: "Legal terminology", isCorrect: false },
      { id: 4, text: "Cooking techniques", isCorrect: false },
    ];
  };

  const extractOptions = (questionData) => {
    if (questionData.options && Array.isArray(questionData.options)) {
      return questionData.options.map((opt, index) => {
        if (typeof opt === "string") {
          return {
            id: index + 1,
            text: opt,
            isCorrect:
              questionData.answer === index + 1 || questionData.answer === opt,
          };
        } else if (opt && typeof opt === "object") {
          return {
            id: index + 1,
            text: opt.text || `Option ${index + 1}`,
            isCorrect:
              questionData.answer === index + 1 ||
              questionData.answer === opt.text ||
              opt.isCorrect === true,
          };
        }
        return { id: index + 1, text: `Option ${index + 1}`, isCorrect: false };
      });
    }

    if (questionData.choices && Array.isArray(questionData.choices)) {
      return questionData.choices.map((choice, index) => {
        if (typeof choice === "string") {
          return {
            id: index + 1,
            text: choice,
            isCorrect:
              questionData.answer === index + 1 ||
              questionData.answer === choice,
          };
        } else if (choice && typeof choice === "object") {
          return {
            id: index + 1,
            text: choice.text || `Option ${index + 1}`,
            isCorrect:
              questionData.answer === index + 1 ||
              questionData.answer === choice.text ||
              choice.isCorrect === true,
          };
        }
        return { id: index + 1, text: `Option ${index + 1}`, isCorrect: false };
      });
    }

    if (questionData.alternatives && Array.isArray(questionData.alternatives)) {
      return questionData.alternatives.map((alt, index) => {
        if (typeof alt === "string") {
          return {
            id: index + 1,
            text: alt,
            isCorrect:
              questionData.answer === index + 1 || questionData.answer === alt,
          };
        } else if (alt && typeof alt === "object") {
          return {
            id: index + 1,
            text: alt.text || `Option ${index + 1}`,
            isCorrect:
              questionData.answer === index + 1 ||
              questionData.answer === alt.text ||
              alt.isCorrect === true,
          };
        }
        return { id: index + 1, text: `Option ${index + 1}`, isCorrect: false };
      });
    }

    if (questionData.answer && Array.isArray(questionData.answer)) {
      return questionData.answer.map((ans, index) => {
        if (typeof ans === "string") {
          return {
            id: index + 1,
            text: ans,
            isCorrect:
              questionData.correctAnswer === index + 1 ||
              questionData.correctAnswer === ans,
          };
        } else if (ans && typeof ans === "object") {
          return {
            id: index + 1,
            text: ans.text || `Option ${index + 1}`,
            isCorrect:
              questionData.correctAnswer === index + 1 ||
              questionData.correctAnswer === ans.text ||
              ans.isCorrect === true,
          };
        }
        return { id: index + 1, text: `Option ${index + 1}`, isCorrect: false };
      });
    }

    const potentialOptionKeys = Object.keys(questionData).filter(
      (key) =>
        Array.isArray(questionData[key]) &&
        questionData[key].length > 0 &&
        !key.toLowerCase().includes("question")
    );

    for (const key of potentialOptionKeys) {
      const potentialOptions = questionData[key];
      if (potentialOptions.length > 0) {
        return potentialOptions.map((opt, index) => {
          if (typeof opt === "string") {
            return {
              id: index + 1,
              text: opt,
              isCorrect:
                questionData.answer === index + 1 ||
                questionData.answer === opt,
            };
          } else if (opt && typeof opt === "object") {
            return {
              id: index + 1,
              text: opt.text || `Option ${index + 1}`,
              isCorrect:
                questionData.answer === index + 1 ||
                questionData.answer === opt.text ||
                opt.isCorrect === true,
            };
          }
          return {
            id: index + 1,
            text: `Option ${index + 1}`,
            isCorrect: false,
          };
        });
      }
    }

    return createDefaultOptions();
  };

  const generateQuestions = useCallback(async () => {
    setLoading(true);
    setProgress(0);
    setQuestions([]);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate",
        {
          text: aiConfig.topic,
          type: "MCQ",
          difficulty: aiConfig.difficulty,
          num_questions: aiConfig.questionCount,
        },
        {
          onUploadProgress: (progressEvent) => {
            const percentComplete = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(percentComplete);
          },
        }
      );

      const generatedQuestions = response.data?.questions || [];

      if (generatedQuestions.length > 0) {
        const formattedQuestions = generatedQuestions.map(
          (q, questionIndex) => {
            const uniqueId = generateUniqueId();
            const questionText =
              q.question || q.text || `Question ${questionIndex + 1}`;
            const options = extractOptions(q);

            return {
              id: uniqueId,
              text: questionText,
              type: "multiple-choice",
              options: options,
              explanation: q.explanation || "",
              originalData: q,
            };
          }
        );

        setQuestions(formattedQuestions);

        if (
          onQuestionsGenerated &&
          typeof onQuestionsGenerated === "function"
        ) {
          onQuestionsGenerated(formattedQuestions);
        }
      } else {
        setError(
          "No questions were generated. Please try a different topic or settings."
        );
      }
    } catch (err) {
      let errorMessage =
        "Failed to generate questions. Please check your network connection and try again.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [aiConfig, onQuestionsGenerated]);

  const generatePDF = useCallback(() => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Generated Questions", 10, 10);
    let yOffset = 20;
    const maxHeight = 280;

    questions.forEach((question, index) => {
      if (yOffset + 10 > maxHeight) {
        doc.addPage();
        yOffset = 10;
      }
      const questionText = question.text || `Question ${index + 1}`;
      doc.text(`Q${index + 1}: ${questionText}`, 10, yOffset);
      yOffset += 10;

      const options = question.options || [];
      if (options.length) {
        options.forEach((opt, i) => {
          if (yOffset + 6 > maxHeight) {
            doc.addPage();
            yOffset = 10;
          }
          const optionText =
            typeof opt === "string" ? opt : opt.text || `Option ${i + 1}`;
          doc.text(`Option ${i + 1}: ${optionText}`, 10, yOffset);
          yOffset += 6;
        });
      }

      if (question.explanation) {
        if (yOffset + 10 > maxHeight) {
          doc.addPage();
          yOffset = 10;
        }
        doc.text(`Explanation: ${question.explanation}`, 10, yOffset);
        yOffset += 10;
      }

      yOffset += 10;
    });

    doc.save("questions.pdf");
  }, [questions]);

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">AI Quiz Generator</h2>
      </div>

      <p className="text-muted-foreground">
        Provide information about the quiz you want to create and our AI will
        generate questions for you.
      </p>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="Enter the topic of the quiz"
              value={aiConfig.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Enter any specific instructions for the quiz"
              value={aiConfig.instructions}
              onChange={(e) => handleChange("instructions", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                onValueChange={(value) => handleChange("difficulty", value)}
                defaultValue={aiConfig.difficulty}
              >
                <SelectTrigger id="difficulty" className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionCount">Number of Questions</Label>
              <Input
                id="questionCount"
                type="number"
                min="1"
                placeholder="Enter number of questions"
                value={aiConfig.questionCount}
                onChange={(e) =>
                  handleChange(
                    "questionCount",
                    parseInt(e.target.value, 10) || 0
                  )
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !aiConfig.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {aiConfig.dueDate ? (
                      format(aiConfig.dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={aiConfig.dueDate}
                    onSelect={(date) => handleChange("dueDate", date)}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Time Limit (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                placeholder="Enter time limit"
                value={aiConfig.duration}
                onChange={(e) =>
                  handleChange("duration", parseInt(e.target.value, 10))
                }
                className="w-full"
              />
            </div>
          </div>

          <Button
            className="w-full mt-4"
            onClick={generateQuestions}
            disabled={loading || !aiConfig.topic}
          >
            {loading ? (
              <React.Fragment>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating
                Questions...
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Questions
              </React.Fragment>
            )}
          </Button>

          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          {loading && (
            <div className="text-center text-sm text-muted-foreground animate-pulse">
              Our AI is creating questions for your quiz...
            </div>
          )}
        </CardContent>
      </Card>

      {loading && (
        <div className="mb-4">
          <div className="w-full bg-gray-300 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">
            Generating Questions... {progress}%
          </p>
        </div>
      )}

      {questions.length > 0 && !loading && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Button
            className="w-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2"
            onClick={generatePDF}
          >
            <FileDown className="h-5 w-5" /> Export to PDF
          </Button>

          <CSVLink
            data={questions.map((q) => ({
              Question: q.text || q.question,
              Options: Array.isArray(q.options)
                ? q.options
                    .map((o) => (typeof o === "string" ? o : o.text))
                    .join(", ")
                : "",
            }))}
            filename="questions.csv"
            className="w-full"
          >
            <Button className="w-full bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2">
              <FileText className="h-5 w-5" /> Export to CSV
            </Button>
          </CSVLink>
        </div>
      )}
    </div>
  );
};
