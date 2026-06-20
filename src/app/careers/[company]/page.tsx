import type { Metadata } from "next";
import { getCompanyJobs } from "@/lib/careers";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { JobCard } from "@/components/careers/job-card";

export const revalidate = 300;

type Props = { params: Promise<{ company: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company } = await params;

  // Fetch jobs to extract the display name from the first result's company field.
  const jobs = await getCompanyJobs(company);
  const displayName =
    jobs.length > 0 && jobs[0].company?.name
      ? jobs[0].company.name
      : company;

  return {
    title: `Careers at ${displayName}`,
    description: `Open positions at ${displayName}. Find your next role and join the team.`,
    alternates: { canonical: `/careers/${company}` },
  };
}

export default async function CompanyCareersPage({ params }: Props) {
  const { company } = await params;

  const jobs = await getCompanyJobs(company);

  // Derive the display name the same way generateMetadata does.
  const displayName =
    jobs.length > 0 && jobs[0].company?.name
      ? jobs[0].company.name
      : company;

  return (
    <>
      {/* Hero */}
      <Section pad="standard" surface="gradient">
        <Container size="md">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              We&apos;re hiring
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Join the team at{" "}
              <em className="serif-italic not-italic text-brand-700">
                {displayName}
              </em>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-secondary">
              Explore open roles and find the opportunity that excites you.
              We&apos;re building something meaningful — come be part of it.
            </p>
          </div>
        </Container>
      </Section>

      {/* Job listings */}
      <Section pad="standard" surface="muted">
        <Container size="lg">
          {jobs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} company={company} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-24 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Stay tuned
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-ink">
                No open roles right now
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-secondary">
                We don&apos;t have any openings at the moment, but that can
                change quickly. Check back soon.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
