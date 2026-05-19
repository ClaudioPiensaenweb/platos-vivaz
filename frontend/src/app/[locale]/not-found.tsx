import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="pt-24">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-foreground">{t("title")}</h2>
        <p className="mt-2 text-muted">{t("description")}</p>
        <div className="mt-8">
          <Button href="/" variant="primary" size="lg">
            {t("backHome")}
          </Button>
        </div>
      </Container>
    </div>
  );
}
