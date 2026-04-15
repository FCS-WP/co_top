<?php

defined('ABSPATH') || exit;

$variant = $attributes['variant'] ?? 'quartz';
$presets = [
    'quartz' => [
        'label' => 'Quartz Stone',
        'title' => 'Engineered Perfection',
        'body' => 'Composed of up to 93% natural quartz crystals, our surfaces offer the beauty of natural stone with superior consistency, durability, and hygiene.',
        'bg' => 'white',
        'cards' => [
            ['label' => 'Premium Quartz', 'name' => 'Hanstone Quartz', 'desc' => 'A globally recognised quartz brand offering 90+ colours with consistent pattern and superior resistance to scratches, stains, and heat. Ideal for kitchen countertops and bathroom vanities.', 'image' => 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', 'features' => ['Scratch Resistant', 'Non-Porous', '90+ Colours', 'NSF Certified']],
            ['label' => 'Value Quartz', 'name' => 'Cresto Quartz', 'desc' => 'An accessible yet premium quartz range offering excellent durability and a wide colour palette. Delivers exceptional value without compromising on performance or aesthetics.', 'image' => 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80', 'price' => '$240', 'unit' => '/ sqft installed', 'note' => 'Supply $120–$160/sqft', 'features' => ['Stain Resistant', 'Easy Clean', 'Wide Palette', 'Commercial Grade']],
        ],
    ],
    'solid' => [
        'label' => 'Solid Surface',
        'title' => 'Seamless by Design',
        'body' => 'Solid surface is the material of choice for architects and designers who demand seamless, hygienic, and infinitely customisable surfaces for high-end interiors.',
        'bg' => 'gray',
        'cards' => [
            ['label' => 'Premium Solid Surface', 'name' => 'Hanex Solid Surface', 'desc' => 'One of Korea\'s most trusted solid surface brands. Hanex offers exceptional thermoformability — curved shapes, seamless joins, and integrated sink bowls. Perfect for reception counters, vanities, and bespoke furniture.', 'image' => 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', 'price' => '$380', 'unit' => '/ sqft installed', 'note' => 'Supply $200–$260/sqft', 'features' => ['Thermoformable', 'Seamless Joins', 'Repairable', 'Anti-Bacterial']],
            ['label' => 'Value Solid Surface', 'name' => 'Cresto Solid Surface', 'desc' => 'A versatile solid surface range that balances cost-effectiveness with quality. Delivers consistent performance across residential and light commercial applications.', 'image' => 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', 'price' => '$280', 'unit' => '/ sqft installed', 'note' => 'Supply $140–$180/sqft', 'features' => ['Mouldable', 'Non-Porous', 'Easy Repair', 'Multiple Finishes']],
        ],
    ],
];
$data = $presets[$variant] ?? $presets['quartz'];
$cards_key = $variant === 'solid' ? 'solidCards' : 'quartzCards';
$section_ids = [
    'quartz' => 'quartz-stone',
    'solid' => 'solid-surface',
];
$section_id = $section_ids[$variant] ?? $section_ids['quartz'];
$custom_cards = is_array($attributes[$cards_key] ?? null) ? $attributes[$cards_key] : [];

if (!empty($custom_cards)) {
    $data['cards'] = array_values(array_filter(array_map(static function ($card) {
        if (!is_array($card)) {
            return null;
        }

        $features = is_array($card['features'] ?? null) ? $card['features'] : [];

        return [
            'label' => (string) ($card['label'] ?? ''),
            'name' => (string) ($card['name'] ?? ''),
            'desc' => (string) ($card['desc'] ?? ''),
            'image' => (string) ($card['image'] ?? ''),
            'price' => (string) ($card['price'] ?? ''),
            'unit' => (string) ($card['unit'] ?? ''),
            'note' => (string) ($card['note'] ?? ''),
            'features' => array_values(array_filter(array_map('strval', $features))),
        ];
    }, $custom_cards)));
}

$wrapper = get_block_wrapper_attributes([
    'id' => $section_id,
    'class' => 'ctpb ctprod-section ctpb--' . $data['bg'],
    'data-product-section' => $variant,
]);
?>
<section <?php echo $wrapper; ?>>
    <div class="ctpb__label"><?php echo esc_html($data['label']); ?></div>
    <h2 class="ctpb__title"><?php echo esc_html($data['title']); ?></h2>
    <p class="ctpb__intro"><?php echo esc_html($data['body']); ?></p>
    <div class="ctpb__grid">
        <?php foreach ($data['cards'] as $card) : ?>
            <div class="ctpb__card">
                <div class="ctpb__img-wrap"><img class="ctpb__img" src="<?php echo esc_url($card['image']); ?>" alt="<?php echo esc_attr($card['name']); ?>" loading="lazy"></div>
                <div class="ctpb__info">
                    <div class="ctpb__brand-label"><?php echo esc_html($card['label']); ?></div>
                    <div class="ctpb__brand-name"><?php echo esc_html($card['name']); ?></div>
                    <p class="ctpb__desc"><?php echo esc_html($card['desc']); ?></p>
                    <?php if (!empty($card['price'])) : ?>
                        <div class="ctpb__price"><span>From</span><strong><?php echo esc_html($card['price']); ?></strong><span><?php echo esc_html($card['unit']); ?></span><small><?php echo esc_html($card['note']); ?></small></div>
                    <?php endif; ?>
                    <div class="ctpb__features"><?php foreach ($card['features'] as $feature) : ?><span><?php echo esc_html($feature); ?></span><?php endforeach; ?></div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
