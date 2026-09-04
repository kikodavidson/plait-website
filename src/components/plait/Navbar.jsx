import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Megaphone,
  TrendingUp,
  BarChart3,
  Route,
  Building2,
  FileText,
  Users,
  Star,
  CalendarCheck,
  Mail,
  MenuIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
  NavItemMobile,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const servicesLinks = [
  {
    title: "Paid Media Management",
    href: "/services",
    description: "Full-funnel ad programs across Meta, Google & TikTok",
    icon: Megaphone,
  },
  {
    title: "Conversion Optimization",
    href: "/services",
    description: "Landing pages and CRO that turn clicks into revenue",
    icon: TrendingUp,
  },
  {
    title: "Marketing Analytics",
    href: "/services",
    description: "Clean tracking and dashboards you can trust",
    icon: BarChart3,
  },
  {
    title: "Our Process",
    href: "/our-process",
    description: "How the partnership works, step by step",
    icon: Route,
  },
  {
    title: "Industries",
    href: "/industries",
    description: "Verticals we know inside and out",
    icon: Building2,
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Growth insights and breakdowns",
    icon: FileText,
  },
];

const companyLinks = [
  {
    title: "About Us",
    href: "/about",
    description: "The team behind Plait",
    icon: Users,
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    description: "Real results from real brands",
    icon: Star,
  },
  {
    title: "Book a Free Audit",
    href: "/book",
    description: "See what's holding your growth back",
    icon: CalendarCheck,
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Talk to a strategist",
    icon: Mail,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href) => (e) => {
    e.preventDefault();
    navigate(href);
  };

  const directLink =
    "cursor-pointer rounded-none px-4 py-1 text-sm font-semibold text-black/70 hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black data-[active=true]:bg-transparent data-[active=true]:text-black";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100/80 py-3 shadow-sm"
          : "bg-white py-5"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="https://media.base44.com/images/public/6a1928801eca8e11c3594ddb/56e6c8a0d_logos5.png"
            alt="PLAIT Marketing"
            className="h-40 w-auto mix-blend-multiply"
          />
        </Link>

        {/* Desktop mega menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="rounded-none text-sm font-semibold text-black/70 hover:text-black data-[state=open]:bg-transparent data-[state=open]:text-black hover:bg-transparent focus:bg-transparent focus:text-black">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-full md:w-[56rem] md:grid-cols-[1fr_.30fr]">
                  <ul className="grid grow gap-4 p-4 md:grid-cols-3 md:border-r">
                    {servicesLinks.slice(0, 3).map((link) => (
                      <li key={link.title}>
                        <NavGridCard link={link} href={link.href} onClick={go(link.href)} />
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1 p-4">
                    {servicesLinks.slice(3).map((link) => (
                      <li key={link.title}>
                        <NavSmallItem
                          item={link}
                          href={link.href}
                          className="gap-x-1"
                          onClick={go(link.href)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="rounded-none text-sm font-semibold text-black/70 hover:text-black data-[state=open]:bg-transparent data-[state=open]:text-black hover:bg-transparent focus:bg-transparent focus:text-black">
                Company
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-full md:w-[56rem] md:grid-cols-[1fr_.40fr]">
                  <ul className="grid grow grid-cols-2 gap-4 p-4 md:border-r">
                    {companyLinks.slice(0, 2).map((link) => (
                      <li key={link.title}>
                        <NavGridCard link={link} className="min-h-36" href={link.href} onClick={go(link.href)} />
                      </li>
                    ))}
                    <div className="col-span-2 grid grid-cols-2 gap-x-4">
                      {companyLinks.slice(2).map((link) => (
                        <li key={link.title}>
                          <NavLargeItem href={link.href} link={link} onClick={go(link.href)} />
                        </li>
                      ))}
                    </div>
                  </ul>
                  <ul className="space-y-2 p-4">
                    {companyLinks.map((link) => (
                      <li key={link.title}>
                        <NavLargeItem href={link.href} link={link} onClick={go(link.href)} />
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact"
                onClick={go("/contact")}
                className={directLink}
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            className="btn-gradient rounded-none"
            onClick={() => navigate("/book")}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-none">
                <MenuIcon className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full gap-0 overflow-y-auto rounded-none">
              <div className="flex h-14 items-center justify-between border-b px-4">
                <span className="text-lg font-bold">PLAIT</span>
              </div>
              <div className="grid gap-y-2 px-4 pt-5 pb-12">
                <Accordion type="single" collapsible>
                  {[
                    { id: "services", name: "Services", list: servicesLinks },
                    { id: "company", name: "Company", list: companyLinks },
                  ].map((section) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="capitalize hover:no-underline">
                        {section.name}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <ul className="grid gap-1">
                          {section.list.map((link) => (
                            <li key={link.title}>
                              <NavItemMobile
                                item={link}
                                href={link.href}
                                onClick={go(link.href)}
                              />
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    className="btn-gradient rounded-none w-full"
                    onClick={() => navigate("/book")}
                  >
                    Book a Free Audit
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-none w-full"
                    onClick={() => navigate("/contact")}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}