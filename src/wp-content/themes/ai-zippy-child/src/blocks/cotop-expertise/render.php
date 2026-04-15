<?php

defined('ABSPATH') || exit;

if (!function_exists('ai_zippy_cotop_icon')) :
function ai_zippy_cotop_icon(string $icon): string
{
    $icons = [
        'home' => '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        'commercial' => '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
        'tool' => '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
        'shield' => '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        'clock' => '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>',
        'heart' => '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
        'phone' => '<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>',
    ];
    return $icons[$icon] ?? $icons['shield'];
}
endif;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$items = is_array($attributes['items'] ?? null) ? $attributes['items'] : [];
$wrapper = get_block_wrapper_attributes([
    'id' => 'our-expertise',
    'class' => 'ctex',
]);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($label) : ?><div class="ctex__label"><?php echo esc_html($label); ?></div><?php endif; ?>
    <h2 class="ctex__title"><?php echo esc_html($title); ?></h2>
    <?php if ($body) : ?><p class="ctex__intro"><?php echo esc_html($body); ?></p><?php endif; ?>
    <div class="ctex__grid">
        <?php foreach ($items as $item) : ?>
            <div class="ctex__card">
                <div class="ctex__icon"><?php echo ai_zippy_cotop_icon((string) ($item['icon'] ?? 'shield')); ?></div>
                <div class="ctex__card-title"><?php echo esc_html($item['title'] ?? ''); ?></div>
                <p class="ctex__body"><?php echo esc_html($item['body'] ?? ''); ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>
