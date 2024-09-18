import Image from 'next/image';

const BlogPost4 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Understanding Triggers and How to Avoid Them</h1>

      <Image
        src="/mindfulness-recovery.png"
        alt="Person practicing mindfulness to avoid triggers during recovery."
        width={800}
        height={400}
        className="rounded-lg mx-auto mb-6"
      />

      <p className="text-lg mb-4">
        Triggers are situations, people, or feelings that can cause a craving for substances. Understanding your triggers and learning how to avoid or cope with them is essential for long-term sobriety. Here’s how to identify and manage your triggers effectively.
      </p>

      <h2 className="text-3xl font-semibold mb-4">1. Identify Your Triggers</h2>
      <p className="text-lg mb-4">
        The first step in managing triggers is recognizing what they are. Common triggers include stress, loneliness, certain social situations, and being around people who use substances. Keep track of your emotional and physical reactions to different environments to identify your personal triggers.
      </p>

      <h2 className="text-3xl font-semibold mb-4">2. Create a Plan for High-Risk Situations</h2>
      <p className="text-lg mb-4">
        Once you know your triggers, create a plan to avoid or cope with them. If certain places or people trigger cravings, find ways to avoid them. If you can’t avoid them, practice coping mechanisms such as deep breathing, calling a support person, or leaving the situation.
      </p>

      <h2 className="text-3xl font-semibold mb-4">3. Practice Self-Care</h2>
      <p className="text-lg mb-4">
        Self-care is a powerful tool in managing triggers. By maintaining a healthy lifestyle—getting enough sleep, eating well, and exercising regularly—you’re better equipped to handle the emotional ups and downs that can lead to cravings.
      </p>

      <h2 className="text-3xl font-semibold mb-4">4. Reach Out for Support</h2>
      <p className="text-lg mb-4">
        If you’re feeling overwhelmed by triggers, don’t hesitate to reach out for support. A therapist, sponsor, or sober friend can help you navigate difficult situations and provide guidance when you need it most.
      </p>

      <p className="text-lg mb-4">By identifying and managing your triggers, you can stay in control of your sobriety and build a stronger foundation for your recovery.</p>
    </div>
  );
};

export default BlogPost4;
