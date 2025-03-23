import { notFound } from "next/navigation";
import { skills } from "@/components/skills-container";

function findWork(id: string) {
  for (const skill of skills) {
    const example = skill.examples.find(e => e.id === id);
    if (example) {
      return {
        ...example,
        category: skill.title,
        categoryIcon: skill.icon,
        otherExamples: skill.examples.filter(e => e.id !== id)
      };
    }
  }
  return null;
}

export default function WorkPage({ params }: { params: { id: string } }) {
  const work = findWork(params.id);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-background rounded-xl shadow-sm py-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <button
                onClick={() => window.history.back()}
                className="rounded-full p-2 hover:bg-muted transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Back</span>
              </button>
            </div>
            
            <div>
              <div className="bg-muted/50 rounded-xl p-8">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {work.categoryIcon}
                      <span>{work.category}</span>
                    </div>
                    <h1 className="text-2xl font-bold">{work.title}</h1>
                    <p className="text-foreground/80">{work.longDescription}</p>
                  </div>
                </div>
              </div>
            </div>

            {work.otherExamples.length > 0 && (
              <div className="border-t border-border pt-6">
                <div className="w-full bg-muted/50 rounded-lg p-5">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Other Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {work.otherExamples.map((other) => (
                        <a
                          key={other.id}
                          href={`/works/${other.id}`}
                          className="block bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border/50 hover:bg-background transition-colors"
                        >
                          <h4 className="font-medium">{other.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {other.description}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
