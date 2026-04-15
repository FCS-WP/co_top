<?php

defined('ABSPATH') || exit;

/**
 * Enqueue child theme styles after parent.
 */
function ai_zippy_child_enqueue_assets(): void
{
    $child_css = AI_ZIPPY_CHILD_THEME_DIR . '/assets/dist/css/style.css';
    $utility_css = AI_ZIPPY_CHILD_THEME_DIR . '/assets/css/utilities.css';
    $header_css = AI_ZIPPY_CHILD_THEME_DIR . '/assets/css/header.css';
    $footer_css = AI_ZIPPY_CHILD_THEME_DIR . '/assets/css/footer.css';
    $search_css = AI_ZIPPY_CHILD_THEME_DIR . '/assets/css/search.css';
    $header_sticky_js = AI_ZIPPY_CHILD_THEME_DIR . '/assets/js/header-sticky.js';

    if (file_exists($child_css)) {
        wp_enqueue_style(
            'ai-zippy-child-style',
            AI_ZIPPY_CHILD_THEME_URI . '/assets/dist/css/style.css',
            ['ai-zippy-theme-css-0'],
            filemtime($child_css)
        );
    }

    if (file_exists($utility_css)) {
        wp_enqueue_style(
            'ai-zippy-child-utilities',
            AI_ZIPPY_CHILD_THEME_URI . '/assets/css/utilities.css',
            [],
            filemtime($utility_css)
        );
    }

    if (file_exists($header_css)) {
        wp_enqueue_style(
            'ai-zippy-child-header',
            AI_ZIPPY_CHILD_THEME_URI . '/assets/css/header.css',
            [],
            filemtime($header_css)
        );
    }

    if (file_exists($footer_css)) {
        wp_enqueue_style(
            'ai-zippy-child-footer',
            AI_ZIPPY_CHILD_THEME_URI . '/assets/css/footer.css',
            [],
            filemtime($footer_css)
        );
    }

    if (is_search() && file_exists($search_css)) {
        wp_enqueue_style(
            'ai-zippy-child-search',
            AI_ZIPPY_CHILD_THEME_URI . '/assets/css/search.css',
            [],
            filemtime($search_css)
        );
    }

    if (file_exists($header_sticky_js)) {
        wp_enqueue_script(
            'ai-zippy-child-header-sticky',
            AI_ZIPPY_CHILD_THEME_URI . '/assets/js/header-sticky.js',
            [],
            filemtime($header_sticky_js),
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'ai_zippy_child_enqueue_assets', 20);

/**
 * Enqueue CO-TOP brand fonts in frontend and editor.
 */
function ai_zippy_child_enqueue_cotop_fonts(): void
{
    wp_enqueue_style(
        'ai-zippy-child-cotop-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap',
        [],
        null
    );
}
add_action('wp_enqueue_scripts', 'ai_zippy_child_enqueue_cotop_fonts');
add_action('enqueue_block_editor_assets', 'ai_zippy_child_enqueue_cotop_fonts');
