'use client'

import { Card, CardHeader, CardBody, CardFooter, Image, Button, Divider } from "@heroui/react";
import { Deseo, Regalo, getImageUrl } from "@/lib/directus";
import GiftList from "./GiftList";
import { useState } from "react";

interface WishCardProps {
    wish: Deseo;
    gifts: Regalo[];
}

export default function WishCard({ wish, gifts }: WishCardProps) {
    const [showGifts, setShowGifts] = useState(false);

    return (
        <Card className="w-full max-w-[600px] mx-auto my-6 hover:scale-[1.01] transition-transform">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold text-primary uppercase tracking-wider">{wish.Titulo}</p>
                    <p className="text-small text-default-500">Estado: {wish.status}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="py-4">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                        <Image
                            alt={wish.Titulo}
                            className="object-cover rounded-xl w-full h-48 md:h-full"
                            src={getImageUrl(wish.imagen)}
                            width={270}
                        />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-center">
                        <p className="text-default-600 text-lg">{wish.descripcion}</p>
                    </div>
                </div>

                {showGifts && (
                    <div className="mt-6 animate-appearance-in">
                        <Divider className="my-4" />
                        <h3 className="text-lg font-semibold mb-2 text-secondary">🎁 Ideas de Regalos</h3>
                        <GiftList gifts={gifts} />
                    </div>
                )}
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end gap-2">
                <Button
                    color="primary"
                    variant="flat"
                    onPress={() => setShowGifts(!showGifts)}
                >
                    {showGifts ? "Ocultar Regalos" : `Ver Regalos (${gifts.length})`}
                </Button>
            </CardFooter>
        </Card>
    );
}
