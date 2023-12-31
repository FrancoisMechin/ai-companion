"use client"

import * as z from "zod"
import { Category, Companion } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
	FormDescription,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/image-upload"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface CompanionFormProps {
	initialData: Companion | null
	categories: Category[]
}

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Name is required.",
	}),
	description: z.string().min(1, {
		message: "Description is required.",
	}),
	instructions: z.string().min(200, {
		message: "Instructions require at least 200 characters.",
	}),
	seed: z.string().min(200, {
		message: "Seed require at least 200 characters.",
	}),
	src: z.string().min(1, {
		message: "Image is required.",
	}),
	categoryId: z.string().min(1, {
		message: "Category is required.",
	}),
})

export const CompanionForm = ({
	categories,
	initialData,
}: CompanionFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			description: "",
			instructions: "",
			seed: "",
			src: "",
			categoryId: undefined,
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 pb-10"
				>
					<div className="space-y-2 w-full ">
						<div>
							<h3 className="text-lg font-medium">General Information</h3>
							<p className="text-sm text-muted-foreground">
								General information about your Companion
							</p>
						</div>
						<Separator className="bg-primary/10" />
					</div>
					<FormField
						name="src"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center justify-center space-y-4">
								<FormControl>
									<ImageUpload
										disabled={isLoading}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Elon Musk"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is how your AI Companion will be named
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="description"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="CEO & Founder of Tesla, SpaceX"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Short description for your AI Companion
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="categoryId"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-background">
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a category"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map(category => (
												<SelectItem
													key={category.id}
													value={category.id}
												>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>Pick a category of your AI</FormDescription>
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	)
}
