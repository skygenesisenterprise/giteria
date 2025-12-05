import { redirect } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { org: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { org } = params;
  
  return {
    title: `${org} - Giteria`,
    description: `Organization ${org} dashboard - repositories, teams, and settings`,
  };
}

// Fonction pour vérifier si c'est une organisation
async function isOrganization(orgName: string): Promise<boolean> {
  try {
    // Pour l'instant, simulation simple
    // En production, vérifier en base de données
    const orgNames = ['github', 'microsoft', 'google', 'facebook', 'netflix'];
    return orgNames.includes(orgName.toLowerCase());
  } catch (error) {
    console.error('Error checking organization:', error);
    return false;
  }
}

export default async function OrganizationLayout({ params, children }: Props) {
  const { org } = params;
  
  // Vérifier si c'est une organisation valide
  const isValidOrg = await isOrganization(org);
  
  if (!isValidOrg) {
    // Si ce n'est pas une organisation, rediriger vers /[user]/
    redirect(`/${org}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple pour l'organisation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{org}</h1>
                <p className="text-sm text-gray-500">Organization</p>
              </div>
            </div>
            <nav className="flex space-x-8">
              <a 
                href={`/${org}`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Overview
              </a>
              <a 
                href={`/${org}/repos`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Repositories
              </a>
              <a 
                href={`/${org}/teams`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Teams
              </a>
              <a 
                href={`/${org}/people`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                People
              </a>
              <a 
                href={`/${org}/settings`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Settings
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Contenu principal */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}