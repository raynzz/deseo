import { Card, CardBody, Image, Button } from "@heroui/react";
import { Regalo, getImageUrl } from "@/lib/directus";

interface GiftListProps {
    gifts: Regalo[];
}

export default function GiftList({ gifts }: GiftListProps) {
    if (gifts.length === 0) {
        return <p className="text-gray-500 italic">No hay regalos sugeridos para este deseo aún.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {gifts.map((gift) => (
                <Card key={gift.id} className="bg-content2">
                    <CardBody className="flex flex-row gap-4 items-center p-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                                alt={gift.titulo}
                                className="object-cover w-full h-full rounded-lg"
                                src={getImageUrl(gift.imagenuuid)}
                            />
                        </div>
                        <div className="flex flex-col flex-grow">
                            <h4 className="text-small font-semibold leading-none text-default-600">{gift.titulo}</h4>
                            <p className="text-tiny text-default-500 mt-1">{gift.descripcion}</p>
                            {gift.precio && (
                                <span className="text-small font-bold text-success mt-1">{gift.precio}</span>
                            )}
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
