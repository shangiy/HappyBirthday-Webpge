'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  wish: z.string().min(10, {
    message: 'Wish must be at least 10 characters.',
  }),
});

export type Wish = z.infer<typeof formSchema> & { id: string; timestamp: Date };

type WishFormProps = {
  onWishSubmit: (wish: Omit<Wish, 'id' | 'timestamp'>) => void;
};

export default function WishForm({ onWishSubmit }: WishFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      wish: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onWishSubmit(values);
    form.reset();
  }

  return (
    <Card className="bg-white/30 backdrop-blur-lg border-white/50 shadow-lg rounded-2xl w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
          Send your birthday wish to Adrian
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="bg-white/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wish"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write your birthday wish here..."
                      {...field}
                      className="bg-white/80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="lg">
              Send your birthday wish to Adrian <Gift className="ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
