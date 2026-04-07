export default function Newsletter() {
  return (
    <section className="w-full bg-(--secondary-bg) py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-(--primary-color) mb-4">
          Receba nossas novidades
        </h2>
        <p className="text-(--secondary-color-font) mb-6">
          Inscreva-se em nossa newsletter e fique por dentro das promoções
        </p>
        <div className="flex justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Seu e-mail"
            className="flex-1 px-4 py-2 rounded-lg border border-(--vertical-line)"
          />
          <button className="px-6 py-2 bg-(--primary-color) text-white rounded-lg hover:bg-[#558451a7]">
            Inscrever
          </button>
        </div>
      </div>
    </section>
  );
}
