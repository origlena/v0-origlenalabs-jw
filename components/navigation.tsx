"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Search, Menu, X, User, LogIn, LogOut, Settings, BookOpen, Languages, Check, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import { useLanguage, type Language } from "@/lib/language-context"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Simulations", href: "/simulations" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

const subjectLinks = [
  { name: "Biology Virtual Lab", href: "/biology-virtual-lab" },
  { name: "Chemistry Virtual Lab", href: "/chemistry-virtual-lab" },
  { name: "Physics Virtual Lab", href: "/physics-virtual-lab" },
  { name: "Math Virtual Lab", href: "/math-virtual-lab" },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user, isLoading, signOut } = useSupabaseAuth()
  const { language, setLanguage, t } = useLanguage()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.refresh()
  }

  const userName = user?.full_name || "User"
  const userInitial = userName.charAt(0).toUpperCase()

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: t("language.english") },
    { code: "hi", label: t("language.hindi") },
    { code: "bn", label: t("language.bengali") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-14 md:h-16 lg:h-18 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 touch-manipulation py-2">
          <div className="relative h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10">
            <Image src="/logo.png" alt="Origlena Labs Logo" fill className="object-contain" priority />
          </div>
          <span className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight">
            Origlena <span className="text-primary">Labs</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm lg:text-base xl:text-lg font-medium transition-colors hover:text-primary py-2 px-1 touch-manipulation",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* Subjects Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "text-sm lg:text-base xl:text-lg font-medium py-2 px-1 touch-manipulation gap-1",
                  subjectLinks.some((link) => pathname === link.href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                Subjects
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {subjectLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="cursor-pointer">
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search, Theme Toggle, User */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search */}
          <div
            className={cn(
              "hidden md:flex items-center transition-all duration-300",
              isSearchOpen ? "w-48 lg:w-64 xl:w-80" : "w-10 lg:w-12",
            )}
          >
            {isSearchOpen ? (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 lg:h-5 lg:w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t("nav.search")}
                  className="pl-9 lg:pl-11 pr-8 h-9 lg:h-11 text-sm lg:text-base"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 touch-manipulation"
                >
                  <X className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="h-9 w-9 lg:h-11 lg:w-11 touch-manipulation"
              >
                <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="sr-only">{t("nav.search")}</span>
              </Button>
            )}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 lg:h-11 lg:w-11 touch-manipulation"
          >
            <Sun className="h-4 w-4 lg:h-5 lg:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 lg:h-5 lg:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {!isLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 lg:h-11 px-2 lg:px-3 gap-2 touch-manipulation">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                    <span className="text-xs lg:text-sm font-bold text-white">{userInitial}</span>
                  </div>
                  <span className="hidden lg:inline text-sm font-medium max-w-[100px] truncate">
                    {userName.split(" ")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{userName}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                    {user.class && <span className="text-xs text-muted-foreground">{user.class}</span>}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  {t("nav.profile")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t("nav.myLearning")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  {t("nav.settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Languages className="mr-2 h-4 w-4" />
                    {t("nav.language")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {languages.map((lang) => (
                      <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                        <Check className={cn("mr-2 h-4 w-4", language === lang.code ? "opacity-100" : "opacity-0")} />
                        {lang.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !isLoading ? (
            <Button
              variant="default"
              size="sm"
              asChild
              className="h-9 lg:h-11 px-3 lg:px-4 gap-2 touch-manipulation hidden md:flex"
            >
              <Link href="/auth/login">
                <LogIn className="h-4 w-4" />
                <span className="text-sm lg:text-base">{t("nav.signIn")}</span>
              </Link>
            </Button>
          ) : null}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={t("nav.search")} className="pl-9 h-11 text-base touch-manipulation" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors touch-manipulation active:scale-[0.98]",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted active:bg-muted",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Language Selector for Mobile */}
            <div className="border-t border-border/40 pt-4">
              <div className="px-4 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Languages className="h-4 w-4" />
                {t("nav.language")}
              </div>
              <div className="flex flex-col gap-1 mt-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsMobileMenuOpen(false)
                    }}
                    className={cn(
                      "px-4 py-3 rounded-lg text-base font-medium transition-colors touch-manipulation active:scale-[0.98] flex items-center justify-between",
                      language === lang.code
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted active:bg-muted",
                    )}
                  >
                    <span>{lang.label}</span>
                    {language === lang.code && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border/40 pt-4">
              {!isLoading && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{userInitial}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{userName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-11 bg-transparent"
                    onClick={() => {
                      handleSignOut()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    {t("nav.logout")}
                  </Button>
                </div>
              ) : !isLoading ? (
                <Button className="w-full h-11 gap-2" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/auth/login">
                    <LogIn className="h-4 w-4" />
                    {t("nav.signIn")}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
