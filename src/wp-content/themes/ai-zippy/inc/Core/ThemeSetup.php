<?php

namespace AiZippy\Core;

defined('ABSPATH') || exit;

/**
 * Theme setup: supports, blocks, block categories.
 */
class ThemeSetup
{
    /**
     * Register hooks.
     */
    public static function register(): void
    {
        add_action('after_setup_theme', [self::class, 'setup']);
        add_action('init', [self::class, 'registerBlocks']);
        add_filter('block_categories_all', [self::class, 'blockCategories']);
    }

    /**
     * Theme supports.
     */
    public static function setup(): void
    {
        add_theme_support('wp-block-styles');
        add_theme_support('editor-styles');
        add_theme_support('woocommerce');
        add_theme_support('responsive-embeds');
        //
        add_action('wp_enqueue_scripts', 'wp_enqueue_global_styles', 1);
    }

    /**
     * Register custom blocks from assets/blocks (wp-scripts build output).
     */
    public static function registerBlocks(): void
    {
        $block_json_files = self::getBlockJsonFiles(AI_ZIPPY_THEME_DIR . '/assets/blocks');
        $child_blocks_dir = get_stylesheet_directory() . '/assets/blocks';

        if ($child_blocks_dir !== AI_ZIPPY_THEME_DIR . '/assets/blocks') {
            $block_json_files = array_merge(
                $block_json_files,
                self::getBlockJsonFiles($child_blocks_dir)
            );
        }

        foreach ($block_json_files as $block_json) {
            register_block_type(dirname($block_json));
        }
    }

    /**
     * Get block.json files keyed by block name so child blocks can override parent blocks.
     */
    private static function getBlockJsonFiles(string $blocks_dir): array
    {
        if (!is_dir($blocks_dir)) {
            return [];
        }

        $block_json_files = [];
        $block_json_paths = glob($blocks_dir . '/*/block.json');

        if ($block_json_paths === false) {
            return [];
        }

        foreach ($block_json_paths as $block_json) {
            $metadata = json_decode((string) file_get_contents($block_json), true);
            $block_name = is_array($metadata) && !empty($metadata['name'])
                ? (string) $metadata['name']
                : basename(dirname($block_json));

            $block_json_files[$block_name] = $block_json;
        }

        return $block_json_files;
    }

    /**
     * Register custom block category.
     */
    public static function blockCategories(array $categories): array
    {
        array_unshift($categories, [
            'slug'  => 'ai-zippy',
            'title' => 'AI Zippy',
            'icon'  => 'star-filled',
        ]);

        return $categories;
    }
}
