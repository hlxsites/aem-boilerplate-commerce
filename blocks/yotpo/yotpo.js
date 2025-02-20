import { getConfigValue } from '../../scripts/configs.js';

export default async function decorate(block) {
    const config = {
        baseUrl: "https://cdn-widgetsrepository.yotpo.com/v1/loader/",
        defaultStoreId: "2DscstHDudRbdPAOzC5foy1bLIBMZjhtyDjmsDJq",
        secretKey: await getConfigValue('yotpo-secret-key'),
        storeId: await getConfigValue('yotpo-store-id'),
    }

    try {
        // Function to load external scripts
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };
        let scriptUrl = !!config.storeId ? `${config.baseUrl}${config.storeId}` : `${config.baseUrl}${config.defaultStoreId}`;
        // Load Yotpo script if not already loaded
        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
            await loadScript(scriptUrl);
        }

        // Create and append the Yotpo widget instance
        const yotpoWidget = document.createElement('div');
        yotpoWidget.className = 'yotpo-widget-instance';
        yotpoWidget.setAttribute('data-yotpo-instance-id', '1039593');
        block.appendChild(yotpoWidget);

    } catch (error) {
        console.error('Error loading Yotpo script:', error);
    }
}