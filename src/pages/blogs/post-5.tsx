import Image from 'next/image';

const BlogPost5 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Meditation and Mindfulness for Sobriety</h1>

      <Image
        src="/meditation-sobriety.png"
        alt="Person practicing mindfulness and meditation to support sobriety."
        width={800}
        height={400}
        className="rounded-lg mx-auto mb-6"
      />

      <p className="text-lg mb-4">
        Meditation and mindfulness can be powerful tools in maintaining sobriety. By staying present and focused, you can manage cravings, reduce stress, and stay committed to your recovery journey. Here’s how these practices can help support sobriety.
      </p>

      <h2 className="text-3xl font-semibold mb-4">1. The Benefits of Mindfulness</h2>
      <p className="text-lg mb-4">
        Mindfulness is the practice of staying fully present in the moment. By focusing on the present, you can better manage cravings and avoid relapse. Practicing mindfulness helps you become more aware of your thoughts and emotions, allowing you to deal with them in a healthy way rather than turning to substances.
      </p>

      <h2 className="text-3xl font-semibold mb-4">2. How Meditation Supports Sobriety</h2>
      <p className="text-lg mb-4">
        Meditation is a mental exercise that helps you focus and calm your mind. For people in recovery, it can be a way to manage stress and reduce the urge to use substances. Through regular meditation, you can build mental resilience and gain better control over your reactions to challenging situations.
      </p>

      <h2 className="text-3xl font-semibold mb-4">3. Simple Meditation Techniques to Try</h2>
      <p className="text-lg mb-4">
        If you’re new to meditation, start with simple techniques like deep breathing or guided meditation. Set aside just five minutes a day to sit quietly, breathe deeply, and focus on the present moment. Gradually, you can increase the duration of your meditation sessions as you become more comfortable with the practice.
      </p>

      <h2 className="text-3xl font-semibold mb-4">4. Incorporating Mindfulness Into Your Daily Life</h2>
      <p className="text-lg mb-4">
        You don’t need to meditate for hours each day to benefit from mindfulness. Practice staying present in your everyday activities—whether you’re eating, walking, or even having a conversation. By paying attention to what you’re doing, you can avoid the distractions that often lead to cravings.
      </p>

      <p className="text-lg mb-4">
        Meditation and mindfulness are simple but powerful tools that can help you stay grounded and focused on your sobriety journey. By incorporating these practices into your daily routine, you can build mental strength and resilience that will support your long-term recovery.
      </p>
    </div>
  );
};

export default BlogPost5;
