import React from "react";

export const articleBodies: Record<string, React.ReactNode> = {

  /* ─────────────────────────────────────────────────────────────────────
     ARTICLE 1 — doubling-task-completion
  ───────────────────────────────────────────────────────────────────── */
  "doubling-task-completion": (
    <>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Hi! I&apos;m Anna Yarigina, a UI/UX designer and mentor at the EdTech startup
        Mate Academy — a platform that helps people learn IT professions. Our core
        product is a proprietary LMS where all learning happens directly. Improving
        retention and engagement is one of the key responsibilities of our retention team.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        In this article I&apos;ll share three features where UI/UX design specifically
        drove growth in those metrics.
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">Achievements</h2>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Goal — retention.</span> Students who earn badges are motivated to keep going.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Achievements give both leads and students an additional reason to interact
        with the platform — during active study and while completing introductory
        courses. But for the motivational effect to land, the feature had to be
        immediately understandable. Earning a badge should feel inspiring, not confusing.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Process</h3>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 1 — User research.</span>{' '}
        I analysed user needs, preferences, key platform actions, and motivations
        to determine which achievements would feel most valuable.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 2 — Identifying motivation gaps.</span>{' '}
        I focused on early behaviour patterns: which actions users perform most,
        which features they use, and what we wanted to encourage them to explore.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 3 — Competitor analysis.</span>{' '}
        I studied reward systems on other educational platforms and consolidated
        everything into a document: all achievement types, activity categories,
        and user segments (leads, flex-course students, full-time students).
        The team evaluated every idea and selected those that best matched our
        retention goals. I also defined rules for how rewards would be distributed —
        for example, &ldquo;complete at least 10/20/30 daily tasks to earn the achievement,&rdquo;
        with thresholds set to be attainable but directional.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 4 — Category design.</span>{' '}
        I created reward categories so different achievements would drive different
        actions, keeping three things in mind: which learning KPIs to influence,
        which specific user behaviours to increase, and how to keep rewards
        challenging throughout the full course.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 5 — Visual system.</span>{' '}
        I adapted the graphic component of achievements for easy reuse across a
        large number of badges with different gradients and categories. Each
        achievement also has a specific name and unlock timing.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Result</h3>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">On average, students collectively open <span className="font-medium">46,000 rewards per month</span> across all categories — a result that exceeded all expectations at launch.</p>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        One category that performed especially well: students rating their mentor&apos;s
        homework feedback. After introducing achievement incentives, the share of
        users who leave ratings <span className="font-medium">increased by 20%</span>.
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">Streaks</h2>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Goal — engagement.</span> Encourage self-paced students to study consistently,
        not in bursts.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Streaks tap into a well-understood psychological pattern: once a streak
        is established, breaking it feels like failure. Our hypothesis was that
        gamified consistency tracking would reduce long breaks and help students
        finish courses in a reasonable timeframe.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Process</h3>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 1 — Competitive research.</span>{' '}
        I analysed how Duolingo, Apple Fitness, Snap, and the Streaks app implement
        this mechanic. I decided to present streaks as a persistent widget so users
        always see today&apos;s streak status.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 2 — Frozen streaks.</span>{' '}
        The most interesting UI challenge was designing the &ldquo;frozen streak&rdquo; concept —
        a way for users to skip a day without breaking their chain.
      </p>
      <blockquote style={{ backgroundColor: '#F7F7F9', border: '1px solid #EEEEF0', borderRadius: 14, padding: '16px 20px', margin: '16px 0', color: '#6B6B7A', fontSize: 16, lineHeight: 1.6 }}>
        Losing a streak is demotivating because people perceive it as failure.
        But demanding perfect attendance creates its own problem: anxiety. Our
        solution was to allow one skip day for every five consecutive study days,
        with unused skips accumulating for vacations or difficult periods.
        This balance preserves the motivational pressure while removing the
        all-or-nothing risk of losing the streak entirely.
      </blockquote>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        I hand-drew the frozen flame icons to convey this state clearly, without
        any additional explanation needed.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 3 — Calendar iteration.</span>{' '}
        After release, we discovered that students were maintaining streaks for
        much longer than expected. To honour that effort and make it visible, we
        redesigned the streak view as a calendar — students could now scroll back
        through months and compare their consistency over time.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Result</h3>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">After launch, average weekly time on the platform increased by <span className="font-medium">+30 minutes</span>.</p>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Students now complete <span className="font-medium">twice as many</span> daily mini-tasks as before.
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">Soft deadlines</h2>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Goal — retention.</span> Give structure to students who need it,
        without imposing it on those who don&apos;t.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Self-paced courses have a fundamental tension: some students choose them
        precisely because there are no deadlines, while others struggle without
        external accountability. We needed a solution that served both groups.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        A pre-feature survey confirmed this split: <span className="font-medium">38.2% of students</span> said
        they wanted deadlines — even amid difficult external circumstances.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Process</h3>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 1 — Survey and scoping.</span>{' '}
        We surveyed students to understand the preference split and design the core
        logic: students can enter or exit deadline mode at any time, and must choose
        their target completion timeframe before activating it.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 2 — Usability testing.</span>{' '}
        I ran user tests to identify where the configuration flow broke down —
        where students got confused about how deadlines worked or how to adjust them.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Step 3 — UX refinement.</span>{' '}
        Based on test findings, I simplified the configuration experience. The main
        technical challenge was calculating student progress correctly and determining
        which topic should serve as the starting point for new deadline calculations.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Result</h3>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">Since launch, <span className="font-medium">43% of part-time students</span> use soft deadlines.</p>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Higher than the 38.2% who said they wanted deadlines before the feature
        existed. Some who were initially against the idea tried it after launch
        and kept it on.
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">Takeaways</h2>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Research first, always.</span> In-depth interviews and usability testing
        consistently surfaced needs and pain points that wouldn&apos;t have been
        visible from analytics alone.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Work closely with engineering from the start.</span> Learning about technical
        constraints before presenting a design prevents rework and keeps
        timelines realistic.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Protect design consistency.</span> Gamified features are tempting to over-design.
        Every local flourish that doesn&apos;t belong to the system makes the product
        feel less coherent over time.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Close the feedback loop.</span> Students at Mate Academy are active and vocal.
        Involving them continuously — not just at launch — means every iteration
        starts from real signal, not assumption.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Watch the market.</span> Analysing how other products drive retention metrics
        surfaces ideas worth adapting and mistakes worth skipping.
      </p>
    </>
  ),

  /* ─────────────────────────────────────────────────────────────────────
     ARTICLE 2 — ai-fears-designers
  ───────────────────────────────────────────────────────────────────── */
  "ai-fears-designers": (
    <>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        EdTech startup Mate Academy actively uses AI in education. The platform runs an AI assistant
        and AI-powered practice tool for students. AI also helps mentors with code review.
      </p>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        On one hand, ChatGPT, Midjourney, and other AI models allow us to optimise a significant
        portion of operational tasks. On the other, they still cause anxiety about the future of
        certain professions — particularly in IT and the creative industry.
      </p>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        As a UI/UX Designer and mentor at Mate Academy, I want to share observations that have
        helped students overcome their fears about competing with AI.
      </p>

      <hr className="border-t border-border mb-10" />
      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">
        AI can't communicate with people
      </h2>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        Design isn't just about pretty pictures. First and foremost, it's about functionality and
        usability. That's why the product design profession requires a broad set of skills and
        knowledge. You need to conduct research, generate ideas, create prototypes, test — and
        communicate. I'd even say, communicate a lot.
      </p>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        Effective communication allows a designer to understand the user's needs, expectations, and
        goals — and then propose unconventional solutions that solve real problems, accounting for
        context that is not only user-centric but also technical and financial.
      </p>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        AI can help you spend less time preparing research, but it's not about soft skills. AI won't
        conduct an interview on your behalf — one where it's important not just to ask questions from
        a list but to observe behaviour and adapt questions in the moment.
      </p>

      <hr className="border-t border-border mb-10" />
      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">
        AI expands designers' capabilities, but can't think outside the box
      </h2>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        Artificial intelligence excels at data processing and creating something new based on
        patterns. That's why AI tools can help designers generate a polished image or a draft-level
        concept. But AI lacks the ability to think unconventionally and bring a unique perspective.
        What sets creators' work apart is a personal creative style that AI, as of today, is simply
        unable to replicate.
      </p>

      <hr className="border-t border-border mb-10" />
      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">
        AI is a designer's assistant, not a competitor
      </h2>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        The more tools people gain, the bigger the things they can build. So there will always be
        work. I'd even say that thanks to AI, there will be even more of it, because the field will
        evolve and new professions will emerge.
      </p>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        When it comes specifically to product designers — with UI/UX, things are far more complex.
        Technically, AI can generate a screen the way a specialist would. But the result won't cover
        everything the UI/UX or product design profession encompasses.
      </p>

      <hr className="border-t border-border mb-10" />
      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">
        AI tools lack empathy
      </h2>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        We teach people new professions and know how important it is not just to explain theory and
        generate content for practical tasks, but to communicate. Every student needs a personalised
        approach. Often you need to find the right words for a specific person to encourage them to
        keep learning. Template phrases can't compete with a mentor's empathy and experience.
      </p>

      <hr className="border-t border-border mb-10" />
      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">
        Nine tasks a product designer can delegate to AI
      </h2>
      <ol className="font-body text-base text-ink-primary leading-relaxed mb-5 list-decimal pl-6">
        <li className="mb-2 leading-relaxed">Writing questions for in-depth interviews and usability tests</li>
        <li className="mb-2 leading-relaxed">Creating checklists for design review</li>
        <li className="mb-2 leading-relaxed">Writing documentation for design system elements</li>
        <li className="mb-2 leading-relaxed">Generating colour palettes</li>
        <li className="mb-2 leading-relaxed">Writing text content for websites, platforms, and apps (UX Writing)</li>
        <li className="mb-2 leading-relaxed">Brainstorming ideas</li>
        <li className="mb-2 leading-relaxed">Creating prompts for AI image generators and generating images</li>
        <li className="mb-2 leading-relaxed">Discovering new tools and websites</li>
      </ol>

      <hr className="border-t border-border mb-10" />
      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">
        Ignoring AI tools is not an option
      </h2>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        Just as calculators didn't replace mathematicians, AI won't replace designers. But market
        expectations for their productivity will rise.
      </p>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        A junior who uses ChatGPT will be more advanced than a mid-level specialist who ignores new
        technologies.
      </p>
      <p className="font-body text-base leading-relaxed mb-5" style={{ color: '#3D3D3D' }}>
        We need to accept that artificial intelligence is an excellent assistant for completing
        operational tasks in less time. And the time freed up can be used by designers for more
        strategic, non-template work.
      </p>
    </>
  ),

  /* ─────────────────────────────────────────────────────────────────────
     ARTICLE 3 — junior-designer-guide
  ───────────────────────────────────────────────────────────────────── */
  "junior-designer-guide": (
    <>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        This guide is for anyone who wants to break into UI/UX design. I&apos;m Anna Yarigina — a
        UI/UX designer and coach at Mate Academy — and I&apos;ll walk you through what employers
        actually look for, what to expect in interviews, and how to prepare.
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">What employers look for in junior designers</h2>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        The strongest asset most juniors have is personal skills: asking the right questions,
        accepting constructive criticism and using it to improve, and paying attention to the
        smallest details. By smallest, I mean things like &ldquo;this block is off by a couple of
        pixels&rdquo; or &ldquo;there&apos;s a typo here.&rdquo; A single instance isn&apos;t a
        problem. But if you notice these inaccuracies in your work consistently, it&apos;s worth
        addressing them.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Employers also want to see that you can work with business requirements and that you
        understand how design affects both the user experience and business goals.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Equally important is showing you&apos;re ready to learn and grow. You need a clear
        development roadmap — and you need to be able to talk about it in an interview. Speaking in
        a structured, consistent, logical way is itself an important skill for designers, because
        you&apos;ll constantly be explaining ideas, thought processes, and design decisions at work.
        I strongly recommend reading about the{' '}
        <span className="font-medium">BLUF method</span> (Bottom Line Up Front).
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        On the technical side, it&apos;s important to understand design principles and how they apply
        in UI/UX. And finally — strong visual literacy is always valued. Knowing how to find and
        reference excellent products is something good designers do as a habit.
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">Red flags in interviews</h2>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        For juniors, motivation should come from experience, projects, and the craft itself. If a
        junior immediately and repeatedly asks about money, it signals to the recruiter that they
        entered IT because &ldquo;it pays well.&rdquo; Before going to interviews, get clear on why
        you chose this field — and be able to articulate it.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Mentorship from more experienced colleagues at your first job is incredibly valuable, but
        don&apos;t emphasise that you need supervision during the interview. Project independence:
        find answers yourself first, then ask for help.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Don&apos;t embellish. If you haven&apos;t read a book, don&apos;t mention it — you may get
        follow-up questions that expose the gap.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Not knowing basic facts about the company, and having no questions for the recruiter or
        team, reads as disinterest in the conversation and the role.
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">What to expect in an interview</h2>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Research theory (UX)</h3>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-3">
        Interviewers test whether you understand the full design process and various research methods:
      </p>
      <ul className="font-body text-base text-ink-primary leading-relaxed mb-5 list-disc pl-6">
        <li className="mb-2 leading-relaxed">What is design thinking?</li>
        <li className="mb-2 leading-relaxed">What are the stages of the design process?</li>
        <li className="mb-2 leading-relaxed">How do you approach user research? What methods do you use to gather information?</li>
        <li className="mb-2 leading-relaxed">What is the purpose of surveys?</li>
        <li className="mb-2 leading-relaxed">When should you conduct interviews rather than surveys?</li>
        <li className="mb-2 leading-relaxed">Can you describe a situation where you changed a design based on user feedback?</li>
        <li className="mb-2 leading-relaxed">What is heuristic analysis?</li>
        <li className="mb-2 leading-relaxed">What is a Customer Journey Map? Why is it built?</li>
        <li className="mb-2 leading-relaxed">What are the requirements for usability test tasks? What is the minimum number of tasks?</li>
        <li className="mb-2 leading-relaxed">How do you create a persona? What information does it include?</li>
        <li className="mb-2 leading-relaxed">What is a product hypothesis and how do you formulate one?</li>
      </ul>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">UI theory</h3>
      <ul className="font-body text-base text-ink-primary leading-relaxed mb-5 list-disc pl-6">
        <li className="mb-2 leading-relaxed">Why do we study design patterns?</li>
        <li className="mb-2 leading-relaxed">What does &ldquo;1 screen — 1 action&rdquo; mean?</li>
        <li className="mb-2 leading-relaxed">What is a UI Kit and why do we need one?</li>
        <li className="mb-2 leading-relaxed">What is the difference between a UI Kit, a Design System, and Guidelines?</li>
        <li className="mb-2 leading-relaxed">What is the law of common region?</li>
        <li className="mb-2 leading-relaxed">What is visual rhyme in interfaces? Give an example.</li>
        <li className="mb-2 leading-relaxed">What are the characteristics of a good UI?</li>
      </ul>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">General questions</h3>
      <ul className="font-body text-base text-ink-primary leading-relaxed mb-5 list-disc pl-6">
        <li className="mb-2 leading-relaxed">What website, designer, or studio do you admire, and why?</li>
        <li className="mb-2 leading-relaxed">What product do you like, and why?</li>
        <li className="mb-2 leading-relaxed">What design books have you read?</li>
        <li className="mb-2 leading-relaxed">Can you share a time when you had to compromise on a design decision?</li>
        <li className="mb-2 leading-relaxed">Can you give an example of balancing user needs with business requirements?</li>
      </ul>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Portfolio review</h3>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        You will almost certainly walk through your portfolio and answer questions like: Can you
        share a project you&apos;re particularly proud of? What challenges did you face and how did
        you overcome them? What problems did you solve in this project?
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        Prepare your answers in advance. Make sure your portfolio is:
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-3">
        <span className="font-medium">Clean</span> — elements are aligned, there is composition,
        colours are contrasty, text is legible.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-3">
        <span className="font-medium">Current</span> — contains recent work so interviewers can
        assess your skills as they are now.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Process-driven</span> — shows how you move from idea to final
        product, not just polished end results.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        If you&apos;re applying to a product company, you must have product case studies. Dribbble
        shots or landing pages alone may not be sufficient.
      </p>

      <h3 className="font-display font-semibold text-lg text-ink-primary mt-8 mb-3">Whiteboard interview</h3>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        A whiteboard interview in UI/UX design is a session where the candidate solves a problem or
        demonstrates skills directly in Figma — typically within 30 minutes to an hour. This format
        assesses creativity, analytical thinking, stress resilience, and real-time workflow.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-3">
        <span className="font-medium">UI design</span> — design interface elements for a specific app or website.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-3">
        <span className="font-medium">UX tasks</span> — create a user scenario, persona, sitemap,
        prototype, or other UX artefact.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-3">
        <span className="font-medium">Design discussion</span> — defend your design, explain your
        choices, and argue for your decisions.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-3">
        <span className="font-medium">Design critique</span> — review existing solutions and propose
        improvements.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Problem solving</span> — analyse a problem, generate ideas,
        and visualise them.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        To prepare, search for examples using &ldquo;UX Mock Whiteboard Challenge.&rdquo;
      </p>

      <h2 className="font-display font-bold text-xl text-ink-primary mt-14 mb-4">How to prepare</h2>

      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Practice design thinking exercises.</span>{' '}
        Come up with solutions to problems, create user personas, define the steps you&apos;d take
        to solve a design challenge.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Practice in Figma every day.</span>{' '}
        Even one focused hour makes a remarkable difference over time. Small daily improvements
        compound.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Be ready to discuss the process behind every portfolio project</span>{' '}
        — the challenges you faced and how you solved them. Practice presenting your work both in
        your native language and in English.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Follow design blogs, attend webinars, and engage with design communities</span>{' '}
        to stay current with the field.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Prepare questions for the interviewer</span>{' '}
        about the company&apos;s design process, team dynamics, and role expectations. Read about
        the company&apos;s products and goals before the conversation.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Be ready to share your salary expectations.</span>{' '}
        Make sure they&apos;re realistic and reflect your experience level.
      </p>
      <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
        <span className="font-medium">Go to as many interviews as possible.</span>{' '}
        It is, genuinely, the best practice there is.
      </p>
    </>
  ),
};
