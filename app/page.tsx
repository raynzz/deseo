import { directus, readItems } from "@/lib/directus";
import WishCard from "@/components/WishCard";

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
        <main className="min-h-screen bg-background p-8 md:p-24">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                        Lista de Deseos
                    </h1>
                    <p className="text-xl text-default-500">
                        Explora mis deseos y encuentra el regalo perfecto.
                    </p>
                </header>

                <div className="space-y-8">
                    {wishes.map((wish) => {
                        const wishGifts = gifts.filter(g => g.deseo_relacionado === wish.id);
                        return <WishCard key={wish.id} wish={wish} gifts={wishGifts} />;
                    })}
                </div>

                {wishes.length === 0 && (
                    <div className="text-center text-default-400 mt-12">
                        <p>No hay deseos publicados en este momento.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
