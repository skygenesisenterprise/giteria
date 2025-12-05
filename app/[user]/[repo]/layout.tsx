import { Metadata } from 'next';

interface Props {
  params: { user: string; repo: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { user, repo } = params;
  
  return {
    title: `${user} - ${repo} - Giteria`,
    description: `Repository ${repo} from user ${user} - Code, issues, pull requests and more`,
  };
}

export default async function UserRepositoryLayout({ params, children }: Props) {
  const { user, repo } = params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header du repository utilisateur */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href={`/${user}`} className="flex items-center text-gray-700 hover:text-gray-900">
                <span className="font-semibold">{user}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="font-normal">{repo}</span>
              </a>
            </div>
            
            {/* Navigation des tabs */}
            <nav className="flex space-x-1">
              <a 
                href={`/${user}/${repo}`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Code
              </a>
              <a 
                href={`/${user}/${repo}/issues`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Issues
              </a>
              <a 
                href={`/${user}/${repo}/pulls`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Pull Requests
              </a>
              <a 
                href={`/${user}/${repo}/projects`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Projects
              </a>
              <a 
                href={`/${user}/${repo}/wiki`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Wiki
              </a>
              <a 
                href={`/${user}/${repo}/security`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Security
              </a>
              <a 
                href={`/${user}/${repo}/settings`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Settings
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Contenu principal */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}