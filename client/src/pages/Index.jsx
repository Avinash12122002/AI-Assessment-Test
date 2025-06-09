import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  LayoutDashboard,
  Clock,
  BarChart3,
  Shield,
  Users,
  ChevronRight,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckSquare className="h-8 w-8" />,
      title: "AI-Generated Tests",
      description:
        "Create custom skill assessments with our AI test generator or choose from our extensive library.",
    },
    {
      icon: <LayoutDashboard className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description:
        "Monitor candidate progress and detect suspicious behavior with our AI-powered proctoring system.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time-saving Automation",
      description:
        "Automate candidate invitations, reminder emails, and result notifications.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Detailed Analytics",
      description:
        "Generate comprehensive reports with individual and group performance metrics.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Anti-Cheating Measures",
      description:
        "Prevent cheating with environment scanning, screen monitoring, and behavior analysis.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Candidate Experience",
      description:
        "Provide a smooth and professional testing experience for your candidates.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                 <span style={{ color: "#ff6d34" }}>AI-Powered Skill</span> <span style={{ color: "#00bda6 " }}>Assessment Platform</span> 
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Streamline your hiring process with our comprehensive skill
                  testing solution for HR professionals and recruiters.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
  size="lg"
  onClick={() => navigate("/login")}
  className="px-10 py-4 text-lg flex items-center justify-center gap-2"
  style={{ backgroundColor: "#ff6d34" }}
>
  Try for free
  <ChevronRight className="h-4 w-4" />
</Button>

                <Button variant="outline" size="lg">
                  Schedule a demo
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[350px] md:h-[400px]">
                <img
                  src="/lovable-uploads/903cf626-87f8-4aec-8769-2073ff20f90d.png"
                  alt="Dashboard preview"
                  className="rounded-lg shadow-lg bg-white border object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24" id="features">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            <span style={{ color: "#ff6d34" }}>Powerful Assessment Features</span> 
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to evaluate candidates' skills efficiently and
              accurately.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex flex-col space-y-3 p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-primary">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              < span style={{ color: "#ff6d34" }}>How We Compare</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              SkillProve offers the most comprehensive assessment solution in
              the market.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4 pl-0 font-medium">Platform</th>
                  <th className="p-4 font-medium">Best Feature</th>
                  <th className="p-4 pr-0 font-medium">How We Are Using It</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 pl-0 font-medium">SkillProve</td>
                  <td className="p-4">Complete AI-powered assessment suite</td>
                  <td className="p-4 pr-0">
                    All-in-one platform for every step of the assessment process
                  </td>
                </tr>
                <tr className="border-b bg-white">
                  <td className="p-4 pl-0 font-medium">TestGorilla</td>
                  <td className="p-4">Wide range of skill-based assessments</td>
                  <td className="p-4 pr-0">
                    AI-generated or HR-selected questions for customizable test
                    creation
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 pl-0 font-medium">HireVue</td>
                  <td className="p-4">
                    AI video interviewing with face & tone analysis
                  </td>
                  <td className="p-4 pr-0">
                    Facial recognition before/during test; stress detection in
                    voice
                  </td>
                </tr>
                <tr className="border-b bg-white">
                  <td className="p-4 pl-0 font-medium">HackerEarth</td>
                  <td className="p-4">
                    Real-time coding environment with AI grading
                  </td>
                  <td className="p-4 pr-0">
                    Live coding interface with screen/full-screen monitoring
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 pl-0 font-medium">Talogy</td>
                  <td className="p-4">Ethical AI usage & integrity scoring</td>
                  <td className="p-4 pr-0">
                    Transparent, bias-free AI reports on candidate behavior
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              <span style={{color: "#00bda6" }}> Ready to Transform Your Hiring Process?</span>
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Join thousands of companies that trust SkillProve to assess
              candidates accurately and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
  size="lg"
  onClick={() => navigate("/login")}
  className="px-10 py-4 text-lg flex items-center justify-center gap-2"
  style={{ backgroundColor: "#ff6d34" }}
>
                Try for free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Contact sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
