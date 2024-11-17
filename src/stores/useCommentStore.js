import { create } from "zustand"

export const useCommentStore = create((set) => ({
    comments: [],

    addComment: (newComment) => set((state) => ({ comments: [newComment, ...state.comments] })),
    setComments: (newComments) => set({ comments: newComments }),
    deleteComment: (id) => set((state) => ({ comments: state.comments.filter((comment) => comment.id !== id) })),
    updateComment: (updatedComment) => set((state) => ({ comments: state.comments.map((comment) => comment.id === updatedComment.id ? updatedComment : comment) }))
}));