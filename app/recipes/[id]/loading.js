import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RecipeLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="container pt-4 pb-2">
          <div className="h-4 w-32 skeleton rounded" />
        </div>

        <section className="pt-8 pb-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image skeleton */}
              <div className="rounded-2xl overflow-hidden">
                <div className="w-full aspect-square skeleton" />
              </div>

              {/* Details skeleton */}
              <div>
                <div className="h-4 w-24 skeleton rounded mb-4" />
                <div className="h-10 w-full skeleton rounded mb-2" />
                <div className="h-10 w-2/3 skeleton rounded mb-6" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full skeleton" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 skeleton rounded" />
                    <div className="h-3 w-16 skeleton rounded" />
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <div className="h-3 w-full skeleton rounded" />
                  <div className="h-3 w-full skeleton rounded" />
                  <div className="h-3 w-2/3 skeleton rounded" />
                </div>

                <div className="grid grid-cols-3 gap-4 p-6 rounded-xl mb-8"
                     style={{ background: 'var(--color-surface-muted)' }}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 rounded-xl skeleton mx-auto mb-2" />
                      <div className="h-3 w-14 skeleton rounded mx-auto mb-1.5" />
                      <div className="h-4 w-10 skeleton rounded mx-auto" />
                    </div>
                  ))}
                </div>

                <div className="h-14 w-full skeleton rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Steps section skeleton */}
        <section className="py-16" style={{ background: 'var(--color-surface-muted)' }}>
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <div className="h-3 w-28 skeleton rounded mx-auto mb-3" />
              <div className="h-8 w-64 skeleton rounded mx-auto" />
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card p-6 flex gap-5">
                  <div className="w-12 h-12 rounded-xl skeleton flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 skeleton rounded" />
                    <div className="h-3 w-full skeleton rounded" />
                    <div className="h-3 w-3/4 skeleton rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
