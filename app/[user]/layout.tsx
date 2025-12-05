import { redirect } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { user: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { user } = params;
  
  return {
    title: `${user} - Giteria`,
    description: `User ${user} profile - repositories, projects, and activity`,
  };
}

// Fonction pour vérifier si c'est un utilisateur
async function isUser(username: string): Promise<boolean> {
  try {
    // Pour l'instant, simulation simple
    // En production, vérifier en base de données
    const userNames = ['johndoe', 'janedoe', 'alice', 'bob', 'charlie'];
    return userNames.includes(username.toLowerCase());
  } catch (error) {
    console.error('Error checking user:', error);
    return false;
  }
}

export default async function UserLayout({ params, children }: Props) {
  const { user } = params;
  
  // Vérifier si c'est un utilisateur valide
  const isValidUser = await isUser(user);
  
  if (!isValidUser) {
    // Si ce n'est pas un utilisateur, rediriger vers /[org]/
    redirect(`/${user}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple pour l'utilisateur */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{user}</h1>
                <p className="text-sm text-gray-500">User Profile</p>
              </div>
            </div>
            <nav className="flex space-x-8">
              <a 
                href={`/${user}`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Overview
              </a>
              <a 
                href={`/${user}/repos`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Repositories
              </a>
              <a 
                href={`/${user}/projects`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Projects
              </a>
              <a 
                href={`/${user}/packages`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Packages
              </a>
              <a 
                href={`/${user}/settings`}
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