import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

/**
 * Configuration du middleware de `next-intl` pour gérer les requêtes localisées.
 * 
 * Cette fonction est appelée automatiquement par `next-intl` à chaque requête
 * côté serveur pour déterminer la locale à utiliser et charger les messages associés.
 * 
 * Elle s'appuie sur la configuration définie dans le fichier `routing.ts`.
 */
export default getRequestConfig(async ({ requestLocale }) => {
    // Récupération de la locale demandée par l'utilisateur
    const requested = await requestLocale;

    // Vérifie si la locale demandée est supportée ; sinon, utilise la locale par défaut
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // Retourne la configuration comprenant :
    // - la locale sélectionnée
    // - les messages de traduction correspondants
    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});