import { directus, readItems } from "@/lib/directus";
import WishCard from "@/components/WishCard";
import { Button } from "@heroui/react";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
    // Fetch wishes
    const wishes = await directus.request(readItems('deseo', {
        filter: {
            status: {
                _eq: 'published'
            }
        }
    }));

    // Fetch gifts
    const gifts = await directus.request(readItems('regalos', {
        filter: {
            status: {
                _eq: 'published'
            }
        }
    }));

    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[128px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[128px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center mb-24 space-y-8">
                    <div className="inline-block">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-default-100 text-default-500 mb-4 inline-block">
                            Wishlist 2024
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Mi Lista de <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Deseos & Regalos
                        </span>
                    </h1>

                    <p className="text-xl text-default-500 max-w-2xl mx-auto leading-relaxed">
                        Un espacio curado con las cosas que me hacen ilusión.
                        Explora la colección y encuentra la inspiración perfecta.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <Button
                            size="lg"
                            color="primary"
                            variant="shadow"
                            className="font-semibold"
                            as="a"
                            href="#wishlist"
                        >
                            Ver Lista
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            as="a"
                            href="https://github.com/raynerteran"
                            target="_blank"
                        >
                            Mi GitHub
                        </Button>
                    </div>
                </div>

                {/* Wishlist Grid */}
                <div id="wishlist" className="space-y-12 scroll-mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">Colección</h2>
                        <span className="text-default-400">{wishes.length} deseos</span>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {wishes.length > 0 ? (
                            wishes.map((wish) => {
                                const wishGifts = gifts.filter(g => g.deseo_relacionado === wish.id);
                                return <WishCard key={wish.id} wish={wish} gifts={wishGifts} />;
                            })
                        ) : (
                            <div className="col-span-1 text-center py-20 bg-content1/50 rounded-2xl border border-dashed border-default-200">
                                <p className="text-xl text-default-400">No hay deseos publicados por ahora.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
