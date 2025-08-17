export default function AboutSection() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-bitnest-gradient" data-testid="about-title">
          BitNest
        </h2>
        <button 
          className="bg-bitnest-green text-bitnest-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-80 transition-all duration-300"
          data-testid="about-more-button"
        >
          More
        </button>
      </div>
      <div className="bg-bitnest-gray rounded-2xl p-6 border border-bitnest-green">
        <h3 className="text-lg font-semibold mb-2" data-testid="about-subtitle">
          The ecosystem of the next generation cryptocurrency, known as 'Cryptocurrency Banking Smart Contract on Blockchain'
        </h3>
        <p className="text-bitnest-light-gray text-sm leading-relaxed" data-testid="about-description">
          BitNest is a decentralized finance (DeFi) platform based on blockchain technology, aimed at establishing a distributed digital world system characterized by transparency, accessibility, and inclusiveness. It realizes a decentralized peer-to-peer economic circulation model that securely meets the savings needs of global users and institutions for capital flow, leasing, and alternating income while ensuring capital preservation.
        </p>
      </div>
    </section>
  );
}
