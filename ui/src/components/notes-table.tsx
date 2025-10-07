import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function NotesTable() {
  const queryClient = useQueryClient();

  // Fetch all notes
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await fetch("/api/notes");
      if (!res.ok) throw new Error("Failed to fetch notes");
      return res.json();
    },
  });

  // Delete note mutation
  const deleteNote = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete note");
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["notes"], (old: any) =>
        old?.filter((n: any) => n.ID !== id),
      );
      toast.success("Note deleted");
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-sm text-muted-foreground">
        Loading notes...
      </p>
    );

  if (!notes?.length)
    return (
      <p className="text-center text-sm text-muted-foreground">No notes yet.</p>
    );

  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note: any) => (
            <TableRow key={note.ID}>
              <TableCell>{note.ID}</TableCell>
              <TableCell>{note.note}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteNote.mutate(note.ID)}
                  disabled={deleteNote.isPending}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
