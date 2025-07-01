"use client"; // Error components must be Client Components


import { Button } from "@heroui/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function Error({ error, reset }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="space-y-4">
            <Alert color="destructive" variant="soft">
                <Info className="h-5 w-5" />
                <AlertDescription>Something went wrong!</AlertDescription>
            </Alert>
            <Button onPress={() => reset()} color="danger" size="sm">
                Try again
            </Button>
        </div>
    );
}

