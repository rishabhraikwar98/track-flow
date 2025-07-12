import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Rocket, Users } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
    title: "Secure by Design",
    description: "JWT + Cookies + RBAC for enterprise-grade protection.",
  },
  {
    icon: <Users className="h-6 w-6 text-green-500" />,
    title: "Team Collaboration",
    description: "Invite teammates, assign issues, and track progress in real-time.",
  },
  {
    icon: <Rocket className="h-6 w-6 text-purple-500" />,
    title: "Blazing Fast",
    description: "Built with React, TypeScript, and RTK for lightning speed.",
  },
];

const Features = () => {
  return (
    <section className="px-6 py-14 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, idx) => (
        <Card key={idx} className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center gap-4">
            {feature.icon}
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">{feature.description}</CardContent>
        </Card>
      ))}
    </section>
  );
};

export default Features;
