export interface NavItem {
  label: string;
  id: string;
  haptic: number;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "About", id: "about", haptic: 15 },
  { label: "Skills", id: "skills", haptic: 18 },
  { label: "Work", id: "work", haptic: 20 },
  { label: "Projects", id: "work", haptic: 22 },
  { label: "Certs", id: "certs", haptic: 18 },
  { label: "Contact", id: "contact", haptic: 20 },
];
