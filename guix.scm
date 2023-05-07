(use-modules
 (guix packages)
 (guix build-system emacs)
 (guix git-download)
 (gnu packages emacs-xyz))

(define-public emacs-ng2-mode
  (package
   (name "emacs-ng2-mode")
   (version "20201203.1925")
   (source (origin
            (method git-fetch)
            (uri (git-reference
                  (url "https://github.com/AdamNiederer/ng2-mode.git")
                  (commit "d341f177c6e4fb9d99b8639943ab5fc9184e2715")))
            (sha256
             (base32
              "0pz4aj2625m7khqnbpl3h3wh7iwrnzyk61f0qw8w3b4i44fc14h2"))))
   (build-system emacs-build-system)
   (propagated-inputs (list emacs-typescript-mode))
   (home-page "http://github.com/AdamNiederer/ng2-mode")
   (synopsis "Major modes for editing Angular 2")
   (description
    "The main features of the modes are syntax highlighting (enabled with
`font-lock-mode or `global-font-lock-mode'), and easy switching between
templates and components.  Exported names start with \"ng2-\"; private names start
with \"ng2--\".")
   (license #f)))

(packages->manifest
  (cons emacs-ng2-mode
    (map specification->package
      (list "emacs-tide"
            "emacs-next-pgtk"
            "emacs-lsp-mode"
            "node"))))
