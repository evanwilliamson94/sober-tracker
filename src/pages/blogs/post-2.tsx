import Image from 'next/image';

const BlogPost2 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">How to Build a Supportive Sober Community</h1>

      <Image
        src="/sobriety-support-group.png"
        alt="Group of people in a support group sharing stories and supporting each other."
        width={800}
        height={400}
        className="rounded-lg mx-auto mb-6"
      />

      <p className="text-lg mb-4">
        Building a sober community is one of the most powerful tools for staying sober. It offers accountability, support, and a sense of belonging. Here’s how to create a strong network that will help you stay on track.
      </p>

      <h2 className="text-3xl font-semibold mb-4">1. Join a Local Support Group</h2>
      <p className="text-lg mb-4">
        Find a local AA (Alcoholics Anonymous) or NA (Narcotics Anonymous) group to connect with others who understand the challenges of addiction. Regular meetings provide a space for sharing and encouragement.
      </p>

      <h2 className="text-3xl font-semibold mb-4">2. Use Online Communities</h2>
      <p className="text-lg mb-4">
        In addition to local groups, online communities offer support and connection with people from around the world. Join Facebook groups, Reddit threads, or specialized sober apps to stay connected.
      </p>

      <h2 className="text-3xl font-semibold mb-4">3. Reach Out to Sober Friends</h2>
      <p className="text-lg mb-4">
        If you have friends who are also on a sobriety journey, connect with them regularly. Sober friends understand the challenges you face and can provide both advice and emotional support.
      </p>

      <p className="text-lg mb-4">By building a community of support, you can reinforce your commitment to sobriety and share your experiences with others who are on the same path.</p>
    </div>
  );
};

export default BlogPost2;
