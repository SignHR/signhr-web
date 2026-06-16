import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ApplyForm } from "@/components/careers/apply-form";
import { getCompanyJob } from "@/lib/careers";

type Props = { params: Promise<{ company: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company, slug } = await params;
  const job = await getCompanyJob(company, slug);
  if (!job) return {};
  return {
    title: `Apply — ${job.title}`,
    description: `Apply for the ${job.title} position at ${job.company?.name ?? company}.`,
    robots: { index: false, follow: true }, // apply form is noindex
  };
}

export default async function ApplyPage({ params }: Props) {
  const { company, slug } = await params;
  const job = await getCompanyJob(company, slug);
  if (!job) notFound();

  return (
    <>
      <Section pad="compact" surface="gradient" as="header">
        <Container size="md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            {job.company?.name ?? company}
          </p>
          <h1 className="text-display-sm mt-3 text-ink">
            Apply for <em className="serif-italic">{job.title}</em>
          </h1>
          {/* back link */}
          <a
            href={`/careers/${company}/${slug}`}
            className="mt-4 inline-block text-[14px] text-brand-600 hover:underline"
          >
            ← Back to job
          </a>
        </Container>
      </Section>

      <Section pad="compact">
        <Container size="md">
          <ApplyForm
            company={company}
            slug={slug}
            questions={job.screening_questions}
          />
        </Container>
      </Section>
    </>
  );
}
