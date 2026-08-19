export function scrollToSection(sectionId: string) {
  const cleanId = sectionId.replace('#', '');
  const element = document.getElementById(cleanId);
  if (element) {
    const yOffset = -70; // offset for fixed header
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
