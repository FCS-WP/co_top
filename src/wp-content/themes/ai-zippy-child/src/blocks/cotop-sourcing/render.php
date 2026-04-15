<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$image_url = $attributes['imageUrl'] ?? '';
$items = is_array($attributes['items'] ?? null) ? $attributes['items'] : [];
$wrapper = get_block_wrapper_attributes(['class' => 'ctsrc']);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($label) : ?><div class="ctsrc__label"><?php echo esc_html($label); ?></div><?php endif; ?>
    <h2 class="ctsrc__title"><?php echo wp_kses_post(nl2br(esc_html($title))); ?></h2>
    <div class="ctsrc__grid">
        <?php if ($image_url) : ?><img class="ctsrc__image" src="<?php echo esc_url($image_url); ?>" alt="" loading="lazy"><?php endif; ?>
        <div class="ctsrc__points">
            <?php foreach ($items as $item) : ?>
                <div class="ctsrc__point">
                    <span class="ctsrc__num"><?php echo esc_html($item['number'] ?? ''); ?></span>
                    <div><h4><?php echo esc_html($item['title'] ?? ''); ?></h4><p><?php echo esc_html($item['body'] ?? ''); ?></p></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
