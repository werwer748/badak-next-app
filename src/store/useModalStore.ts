import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

type TModalStore = {
  isOpen: boolean;
  title: string;
  content: string;
  open: (title: string, content: string) => void;
  close: () => void;
};
type ModalPersistedState = Pick<TModalStore, "title" | "content">;

export const useModalStore = create<TModalStore>(
  // persist<TModalStore, [], [], ModalPersistedState>(
  // (set): TModalStore => ({
  //   isOpen: false,
  //   title: '',
  //   content: '',
  //   open: (title, content) => set({ isOpen: true, title, content }),
  //   close: () => set({ isOpen: false, title: '', content: '' }),
  // }),
  // {
  //   name: 'modal-store', // localStorage key
  //   storage: createJSONStorage(() => localStorage), // localStorage 사용 - 기본값이지만 명시적으로 설정
  //   // isOpen은 저장하지 않고 title, content만 유지하고 싶을 때 (예시)
  //   partialize: (state): ModalPersistedState => ({
  //     title: state.title,
  //     content: state.content
  //   }),
  // }
  // )
  (set) => ({
    isOpen: false,
    title: '',
    content: '',
    open: (title, content) => set({ isOpen: true, title, content }),
    close: () => set({ isOpen: false, title: '', content: '' }),
  })
);