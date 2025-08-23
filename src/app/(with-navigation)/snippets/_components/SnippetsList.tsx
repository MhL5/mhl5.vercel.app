import LinkButton from "@/components/buttons/LinkButton";
import { navigationLinks, snippetsCategoryConfig } from "@/constants/constants";

export default function SnippetsList() {
  return (
    <div className="mx-auto max-w-4xl">
      {navigationLinks.map((link) => {
        const config =
          snippetsCategoryConfig[
            link.title as keyof typeof snippetsCategoryConfig
          ];
        const Icon = config?.icon;

        return (
          <div key={link.title} className="mb-8">
            <div
              className={`${config?.tailwindClass || "text-gray-600"} mb-4 flex h-10 w-full items-center justify-start gap-3 px-3 text-lg font-semibold tracking-wider capitalize`}
            >
              {Icon && <Icon className="size-5" />}
              {link.title}
            </div>
            <div className="space-y-2 pl-6">
              {link.items?.map((item) => (
                <LinkButton
                  key={item.title}
                  href={item.url}
                  buttonProps={{ variant: "ghost" }}
                  className="h-10 w-full justify-start text-base"
                >
                  {item.title}
                </LinkButton>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
