"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getRandomValues } from "crypto";
import { toast } from "sonner";

// ✅ Corrected zod schema
const SignUpSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    confirmPassword : z.string()
})
.refine((data)=> data.password === data.confirmPassword,{
    message : "Passwords don't match",
    path : ["confirmPassword"]
});

type SignUpFormValues = z.infer<typeof SignUpSchema>;

export function SignUpForm() {
    const router = useRouter();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword : ""
        },
    });

    const onSubmit = async (value: SignUpFormValues) => {
        await authClient.signUp.email(
            {
                name : value.email,
                email : value.email,
                password : value.password,
                callbackURL : "/"
            },
            {
                onSuccess : () => {
                    router.push("/")
                },
                onError : (ctx) => {
                    toast.error(ctx.error.message)
                }
            },
        )
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Get&apos;s started</CardTitle>
                    <CardDescription>create your account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        Continue with GitHub
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        Continue with Google
                                    </Button>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="********"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>confirmPassword</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="confirmpassword"
                                                    placeholder="********"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? "Logging in..." : "sign up"}
                                </Button>
                            </form>
                        <div className="text-center text-sm mt-4">
                            already have an account ? &nbsp;
                            <Link
                                href="/signup"
                                className="underline underline-offset-4"
                            >
                                LogIn
                            </Link>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
