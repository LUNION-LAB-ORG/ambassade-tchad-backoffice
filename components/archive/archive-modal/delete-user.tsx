"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Button } from "@/components/ui/button"

interface DeleteUserModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDelete: () => void;
  user: {
    user: { name: string }
    [key: string]: any;
  }
}

export function DeleteUserModal({
  isOpen,
  setIsOpen,
  onDelete,
  user
}: DeleteUserModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment}>
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Supprimer l’utilisateur
                </Dialog.Title>
                <p className="mt-3 text-sm text-gray-600">
                  Voulez-vous vraiment supprimer l’utilisateur{" "}
                  <strong>{user.user.name}</strong> ? Cette action est irréversible.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="ghost" onClick={() => setIsOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="outline" onClick={onDelete}>
                    Supprimer
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
