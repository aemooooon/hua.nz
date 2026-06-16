import {
    GraduationCap,
    Home,
    Images,
    Mail,
    PanelsTopLeft,
    UserRound,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import './SectionNav.css';

const sectionIcons = {
    home: Home,
    about: UserRound,
    projects: PanelsTopLeft,
    gallery: Images,
    education: GraduationCap,
    contact: Mail,
};

const getLocalizedText = (field, language) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[language] || field.en || field.zh || '';
};

const SectionNav = () => {
    const {
        currentSection,
        sections,
        navigateToSection,
        language,
        isPointerLocked,
        isProjectModalOpen,
        getNewContent,
    } = useAppStore();

    const content = getNewContent();
    const navText = content.sectionNav;
    const [hoveredSectionId, setHoveredSectionId] = useState(null);

    useEffect(() => {
        const handlePointerMove = event => {
            const element = document.elementFromPoint(event.clientX, event.clientY);
            const navItem = element?.closest?.('.section-nav-item');
            setHoveredSectionId(navItem?.dataset.sectionId || null);
        };

        const handlePointerLeave = () => setHoveredSectionId(null);

        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        window.addEventListener('mouseleave', handlePointerLeave);

        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseleave', handlePointerLeave);
        };
    }, []);

    const navItems = useMemo(
        () =>
            sections.map((section, index) => {
                const Icon = sectionIcons[section.id] || PanelsTopLeft;
                return {
                    ...section,
                    index,
                    Icon,
                    label:
                        getLocalizedText(navText?.labels?.[section.id], language) ||
                        section.faces?.label ||
                        section.id,
                };
            }),
        [sections, navText, language]
    );

    const handleNavigate = useCallback(item => navigateToSection(item.index), [navigateToSection]);

    if (isPointerLocked || isProjectModalOpen) {
        return null;
    }

    return (
        <nav
            className="section-nav"
            aria-label={getLocalizedText(navText?.ariaLabel, language) || 'Section navigation'}
        >
            <div className="section-nav-track">
                {navItems.map(item => {
                    const isActive = item.index === currentSection;
                    const isProjects = item.id === 'projects';
                    const shouldShowHint = currentSection === 0 && isProjects;

                    return (
                        <div className="section-nav-item-wrap" key={item.id}>
                            <button
                                type="button"
                                className={`section-nav-item ${isActive ? 'is-active' : ''} ${
                                    hoveredSectionId === item.id ? 'is-hovered' : ''
                                } ${shouldShowHint ? 'is-guided' : ''}`}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                                data-clickable="true"
                                data-section-id={item.id}
                                onClick={() => handleNavigate(item)}
                                onBlur={() => setHoveredSectionId(null)}
                                onFocus={() => setHoveredSectionId(item.id)}
                                onMouseEnter={() => setHoveredSectionId(item.id)}
                                onMouseLeave={() => setHoveredSectionId(null)}
                                title={item.label}
                            >
                                <item.Icon className="section-nav-icon" strokeWidth={1.7} />
                                <span className="section-nav-label">{item.label}</span>
                            </button>

                            {shouldShowHint && (
                                <button
                                    type="button"
                                    className="section-nav-project-hint"
                                    data-clickable="true"
                                    onClick={() => handleNavigate(item)}
                                >
                                    <span>{getLocalizedText(navText?.projectHint, language)}</span>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

export default SectionNav;
