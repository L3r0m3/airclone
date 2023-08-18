'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import {format} from "date-fns";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currenUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currenUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

        const price = useMemo(() => {

            if (reservation) {
                reservation.totalPrice;
            }

            return data.price;
        }, [reservation, data.price])


        const reservationDate = useMemo(() => {
            if (!reservation) {
                return null;
            }

            const start = new Date(reservation.startDate);
            const end = new Date(reservation.endDate);

            return `${format(start, 'PP')} - ${format(end, 'PP')}`
        }, [reservation])

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="
                col-span-1
                cursor-pointer
                group
            "
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                </div>
            </div>
        </div>
    );
}

export default ListingCard;