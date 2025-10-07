import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { NotesTable } from "@/components/notes-table";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();

  const createNote = useMutation({
    mutationFn: async (newNote: string) => {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote }),
      });
      if (!res.ok) throw new Error("Failed to create note");
      return res.json();
    },
    onSuccess: () => {
      setNote("");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast?.success("Note created!");
    },
    onError: (err: any) => {
      toast?.error(err.message || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    createNote.mutate(note);
  };

  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-start gap-8 p-2 pt-10">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Textarea
              name="note"
              placeholder="Write your note..."
              className="h-40"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={createNote.isPending}
            />
            <Button
              variant={"secondary"}
              type="submit"
              disabled={createNote.isPending}
            >
              {createNote.isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <NotesTable />
    </div>
  );
}
