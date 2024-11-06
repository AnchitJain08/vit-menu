export const downloadCartAsImage = async (cart, total) => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.background = 'white';
  container.style.padding = '40px';
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif';

  // Group items by restaurant
  const itemsByRestaurant = cart.reduce((acc, item) => {
    if (!acc[item.restaurant]) {
      acc[item.restaurant] = [];
    }
    acc[item.restaurant].push(item);
    return acc;
  }, {});

  // Create content
  container.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; background: white;">
      <h1 style="font-size: 28px; margin-bottom: 20px; color: #1a1a1a;">
        Order Details
      </h1>
      
      <p style="color: #666; margin-bottom: 30px; font-size: 14px;">
        ${new Date().toLocaleString()}
      </p>

      ${Object.entries(itemsByRestaurant).map(([restaurant, items]) => `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; color: #1a1a1a; padding-bottom: 10px; 
                     border-bottom: 2px solid #eee; margin-bottom: 15px;">
            ${restaurant}
          </h2>
          ${items.map(item => `
            <div style="display: flex; justify-content: space-between; 
                        margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #f5f5f5;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; 
                            background: ${item.isVeg ? '#22c55e' : '#ef4444'};">
                </span>
                <span style="font-size: 16px; color: #333;">
                  ${item.name} × ${item.quantity}
                </span>
              </div>
              <span style="font-size: 16px; color: #333;">
                ₹${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          `).join('')}
        </div>
      `).join('')}

      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
        <div style="display: flex; justify-content: space-between; 
                    font-size: 20px; font-weight: bold; color: #1a1a1a;">
          <span>Total Amount</span>
          <span>₹${total.toFixed(2)}</span>
        </div>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; 
                  text-align: center; color: #666; font-size: 14px;">
        Thank you for your order! - VIT Bhopal Food Menu
      </div>
    </div>
  `;

  // Add to document
  document.body.appendChild(container);

  try {
    // Import and use html2canvas
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(container, {
      scale: 2,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800,
      windowHeight: container.offsetHeight
    });

    // Convert to image and download
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `order-${Date.now()}.png`;
    link.href = image;
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};

const groupByRestaurant = (cart) => {
  return cart.reduce((acc, item) => {
    if (!acc[item.restaurant]) {
      acc[item.restaurant] = [];
    }
    acc[item.restaurant].push(item);
    return acc;
  }, {});
}; 