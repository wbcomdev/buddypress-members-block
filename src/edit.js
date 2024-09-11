/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import { TextControl, PanelBody, SelectControl, RangeControl, ButtonGroup, Button, Spinner } from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { title, sortType, viewType, limit, avatarSize, avatarRadius, membersPerRow, rowSpacing, columnSpacing, carouselSpacing } = attributes;
    const blockProps = useBlockProps();

    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        let endpoint = `/buddypress/v1/members?per_page=${limit}`;

        if (sortType === 'active') {
            endpoint += '&type=active';
        } else if (sortType === 'popular') {
            endpoint += '&type=popular';
        } else if (sortType === 'newest') {
            endpoint += '&type=newest';
        }

        apiFetch({ path: endpoint })
            .then((response) => {
                setMembers(response);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(__('Failed to load members', 'buddypress-members-block'));
                setIsLoading(false);
            });
    }, [sortType, limit]);

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Block Title', 'buddypress-members-block')}>
                    <TextControl
                        label={__('Block Title', 'buddypress-members-block')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Member Sorting', 'buddypress-members-block')}>
                    <SelectControl
                        label={__('Sort By', 'buddypress-members-block')}
                        value={sortType}
                        options={[
                            { label: __('Recently Active', 'buddypress-members-block'), value: 'active' },
                            { label: __('Popular', 'buddypress-members-block'), value: 'popular' },
                            { label: __('Newest', 'buddypress-members-block'), value: 'newest' },
                        ]}
                        onChange={(value) => setAttributes({ sortType: value })}
                    />
                    <RangeControl
                        label={__('Number of Members', 'buddypress-members-block')}
                        value={limit}
                        onChange={(value) => setAttributes({ limit: value })}
                        min={1}
                        max={20}
                    />
                </PanelBody>
                <PanelBody title={__('Layout View', 'buddypress-members-block')}>
                    <ButtonGroup>
                        <Button
                            isPressed={viewType === 'list'}
                            onClick={() => setAttributes({ viewType: 'list' })}
                        >
                            {__('List', 'buddypress-members-block')}
                        </Button>
                        <Button
                            isPressed={viewType === 'grid'}
                            onClick={() => setAttributes({ viewType: 'grid' })}
                        >
                            {__('Grid', 'buddypress-members-block')}
                        </Button>
                        <Button
                            isPressed={viewType === 'carousel'}
                            onClick={() => setAttributes({ viewType: 'carousel' })}
                        >
                            {__('Carousel', 'buddypress-members-block')}
                        </Button>
                    </ButtonGroup> 
                </PanelBody>
                {(viewType === 'grid' || viewType === 'carousel') && (
                    <PanelBody title={__('Members Per Row', 'buddypress-members-block')}>
                        <RangeControl
                            label={__('Number of Members', 'buddypress-members-block')}
                            value={membersPerRow}
                            onChange={(value) => setAttributes({ membersPerRow: value })}
                            min={1}
                            max={5}
                        />
                    </PanelBody>
                )}
                {viewType === 'list' && (
                    <PanelBody title={__('Row Spacing', 'buddypress-members-block')}>
                        <RangeControl
                            label={__('Row Spacing (px)', 'buddypress-members-block')}
                            value={rowSpacing}
                            onChange={(value) => setAttributes({ rowSpacing: value })}
                            min={0}
                            max={50}
                        />
                    </PanelBody>
                )}
                {(viewType === 'grid' || viewType === 'carousel') && (
                    <PanelBody title={__('Spacing', 'buddypress-members-block')}>
                        {viewType === 'grid' && (
                            <RangeControl
                                label={__('Column Spacing (px)', 'buddypress-members-block')}
                                value={columnSpacing}
                                onChange={(value) => setAttributes({ columnSpacing: value })}
                                min={0}
                                max={50}
                            />
                        )}
                        {viewType === 'carousel' && (
                            <RangeControl
                                label={__('Carousel Spacing (px)', 'buddypress-members-block')}
                                value={carouselSpacing}
                                onChange={(value) => setAttributes({ carouselSpacing: value })}
                                min={0}
                                max={50}
                            />
                        )}
                    </PanelBody>
                )}
                <PanelBody title={__('Avatar Size', 'buddypress-members-block')}>
                    <RangeControl
                        label={__('Avatar Size (px)', 'buddypress-members-block')}
                        value={avatarSize}
                        onChange={(value) => setAttributes({ avatarSize: value })}
                        min={50}
                        max={300}
                    />
                    <RangeControl
                        label={__('Avatar Border Radius (px)', 'buddypress-members-block')}
                        value={avatarRadius}
                        onChange={(value) => setAttributes({ avatarRadius: value })}
                        min={0}
                        max={100}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Display Block Title */}
            {title && <h2>{title}</h2>}

            <div
                className={`bp-members-preview ${viewType}`}
                style={{
                    '--row-spacing': viewType === 'list' ? `${rowSpacing}px` : undefined,
                    '--column-spacing': viewType === 'grid' ? `${columnSpacing}px` : undefined,
                    '--members-per-row': viewType === 'grid' ? membersPerRow : undefined,
                    '--carousel-spacing': viewType === 'carousel' ? `${carouselSpacing}px` : undefined,
                }}
            >
                {isLoading ? (
                    <Spinner />
                ) : error ? (
                    <div>{error}</div>
                ) : members.length === 0 ? (
                    <div>{__('No members found', 'buddypress-members-block')}</div>
                ) : viewType === 'carousel' ? (
                    <div className="swiper-container">
                        <Swiper
                            spaceBetween={carouselSpacing}
                            slidesPerView={membersPerRow}
                        >
                            {members.map((member) => (
                                <SwiperSlide key={member.id}>
                                    <div className="bp-member-item">
                                        <a href={member.link}>
                                            <img
                                                src={member.avatar_urls.full}
                                                alt={member.name}
                                                className="bp-member-avatar"
                                                style={{ width: `${avatarSize}px`, height: `${avatarSize}px`, borderRadius: `${avatarRadius}px` }}
                                            />
                                        </a>
                                        <a href={member.link}><div className="bp-member-name">{member.name}</div></a>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>
                        </Swiper>
                    </div>
                ) : (
                    members.map((member) => (
                        <div className="bp-member-item" key={member.id}>
                            <a href={member.link}>
                                <img
                                    src={member.avatar_urls.full}
                                    alt={member.name}
                                    className="bp-member-avatar"
                                    style={{ width: `${avatarSize}px`, height: `${avatarSize}px`, borderRadius: `${avatarRadius}px` }}
                                />
                            </a>
                            <a href={member.link}><div className="bp-member-name">{member.name}</div></a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
