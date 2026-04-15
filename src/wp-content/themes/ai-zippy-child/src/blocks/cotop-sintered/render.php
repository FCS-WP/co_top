<?php

defined('ABSPATH') || exit;

$label = $attributes['label'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$image_url = $attributes['imageUrl'] ?? '';
$items = is_array($attributes['items'] ?? null) ? $attributes['items'] : [];
$wrapper = get_block_wrapper_attributes([
    'id' => 'sintered-stone',
    'class' => 'ctsin ctprod-section',
    'data-product-section' => 'sintered',
]);
?>
<section <?php echo $wrapper; ?>>
    <?php if ($label) : ?><div class="ctsin__label"><?php echo esc_html($label); ?></div><?php endif; ?>
    <h2 class="ctsin__title"><?php echo wp_kses_post(nl2br(esc_html($title))); ?></h2>
    <?php if ($body) : ?><p class="ctsin__intro"><?php echo esc_html($body); ?></p><?php endif; ?>
    <?php if ($image_url) : ?><img class="ctsin__hero-img" src="<?php echo esc_url($image_url); ?>" alt="" loading="lazy"><?php endif; ?>
    <div class="ctsin__grid">
        <?php foreach ($items as $item) : ?>
            <div class="ctsin__card">
                <div class="ctsin__img-wrap"><img class="ctsin__img" src="<?php echo esc_url($item['image'] ?? ''); ?>" alt="<?php echo esc_attr($item['name'] ?? ''); ?>" loading="lazy"></div>
                <div class="ctsin__info">
                    <div class="ctsin__brand-label"><?php echo esc_html($item['label'] ?? ''); ?></div>
                    <div class="ctsin__name"><?php echo esc_html($item['name'] ?? ''); ?></div>
                    <p><?php echo esc_html($item['body'] ?? ''); ?></p>
                    <div class="ctsin__price"><span>From</span><strong><?php echo esc_html($item['price'] ?? ''); ?></strong><span><?php echo esc_html($item['unit'] ?? ''); ?></span></div>
                    <div class="ctsin__features"><?php foreach (($item['features'] ?? []) as $feature) : ?><span><?php echo esc_html($feature); ?></span><?php endforeach; ?></div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
