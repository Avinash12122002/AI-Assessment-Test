import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, Send } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function TestDraftActions({
  testId,
  title,
  isDraft = true,
  onSaveAsDraft,
  onPublish,
}) {
  const { toast } = useToast();
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);

  const handleSaveAsDraft = () => {
    onSaveAsDraft();
    toast({
      title: "Test saved as draft",
      description: `"${title}" has been saved as a draft.`,
    });
  };

  const handlePublish = () => {
    onPublish();
    setPublishDialogOpen(false);
    toast({
      title: "Test published",
      description: `"${title}" has been published and is now available to candidates.`,
    });
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={handleSaveAsDraft}>
          <Save className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>

        <Button onClick={() => setPublishDialogOpen(true)}>
          <Send className="mr-2 h-4 w-4" />
          {isDraft ? "Publish Test" : "Update Test"}
        </Button>
      </div>

      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isDraft ? "Publish Test" : "Update Published Test"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isDraft
                ? "This will make the test available to candidates based on your scheduling settings. Are you sure?"
                : "This will update the test content. Any candidates who haven't taken the test will see the updated version."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePublish}>
              {isDraft ? "Publish" : "Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
