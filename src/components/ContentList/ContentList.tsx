import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../ContentCard/ContentCard';
import Button from '../Button/Button';
import FilterSection from '../FilterSection/FilterSection';
import StatsCounter from '../StatsCounter/StatsCounter';
import { Content } from '../../types/Content';
import { useContentFilter } from '../../hooks/useContentFilter';
import styles from './ContentList.module.css';

interface ContentListProps {
    content: Content[];
    title: string;
    subtitle: string;
    onDelete: (id: string) => void;
    onMarkAsViewed?: (item: Content) => void;
    emptyStateMessage: string;
    noResultsMessage: string;
    from?: string;
}

const ContentList: React.FC<ContentListProps> = ({
    content,
    title,
    subtitle,
    onDelete,
    onMarkAsViewed,
    emptyStateMessage,
    noResultsMessage,
    from
}) => {
    const navigate = useNavigate();
    const {
        filterState,
        setSearchQuery,
        setSelectedGenre,
        setSelectedType,
        setSortBy,
        setSortOrder,
        filteredContent,
        availableGenres
    } = useContentFilter(content);

    const handleEdit = (item: Content) => {
        navigate('/edit', { state: { content: item, from: from || 'home' } });
    };

    const renderEmptyState = () => (
        <div className={styles['empty-state']}>
            <p>
                {content.length === 0
                    ? emptyStateMessage
                    : noResultsMessage}
            </p>
            {content.length === 0 && (
                <Button
                    text="Agregar Contenido"
                    variant="primary"
                    onClick={() => navigate('/new')}
                />
            )}
        </div>
    );

    const renderContentGrid = () => (
        <div className={styles['cards-grid']}>
            {filteredContent.map((item) => (
                <ContentCard
                    key={item.id}
                    data={item}
                    onDelete={() => onDelete(item.id)}
                    onEdit={() => handleEdit(item)}
                    onMarkAsViewed={onMarkAsViewed ? () => onMarkAsViewed(item) : undefined}
                />
            ))}
        </div>
    );

    return (
        <div className={styles['content-list-container']}>
            <div className={styles['title-section']}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            <div className={styles['stats-section']}>
                <StatsCounter content={content} title={`Estadísticas - ${title}`} />
            </div>

            <div className={styles['filter-section']}>
                <FilterSection
                    searchQuery={filterState.searchQuery}
                    selectedGenre={filterState.selectedGenre}
                    selectedType={filterState.selectedType}
                    sortBy={filterState.sortBy}
                    sortOrder={filterState.sortOrder}
                    onSearchChange={setSearchQuery}
                    onGenreChange={setSelectedGenre}
                    onTypeChange={setSelectedType}
                    onSortChange={(field, order) => {
                        setSortBy(field);
                        setSortOrder(order);
                    }}
                    availableGenres={availableGenres}
                />
            </div>

            <h2 className={styles['section-title']}>{title}</h2>

            {filteredContent.length === 0 ? renderEmptyState() : renderContentGrid()}
        </div>
    );
};

export default ContentList; 