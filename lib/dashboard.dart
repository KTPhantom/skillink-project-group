import 'package:flutter/material.dart';
import 'package:skillink/profile.dart';
class ConnectCollaboratePage extends StatefulWidget {
  const ConnectCollaboratePage({Key? key}) : super(key: key);

  @override
  State<ConnectCollaboratePage> createState() => _ConnectCollaboratePageState();
}

class _ConnectCollaboratePageState extends State<ConnectCollaboratePage> {
  int _selectedIndex = 0; // Default to Home

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });

    // Add navigation logic here
  }

  final List<Widget> _pages = [
    const HomeDashboard(),
    Center(child: Text('Network Page')),
    Center(child: Text('Projects Page')),
    Center(child: Text('Messages Page')),
    const ProfilePage(), // 🔥 Added here
  ];


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8.0,
        child: SizedBox(
          height: 60,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              IconButton(
                icon: const Icon(Icons.home),
                onPressed: () => _onItemTapped(0),
                color: _selectedIndex == 0 ? Colors.blue : null,
              ),
              IconButton(
                icon: const Icon(Icons.people),
                onPressed: () => _onItemTapped(1),
                color: _selectedIndex == 1 ? Colors.blue : null,
              ),
              const SizedBox(width: 40),
              IconButton(
                icon: const Icon(Icons.message),
                onPressed: () => _onItemTapped(3),
                color: _selectedIndex == 3 ? Colors.blue : null,
              ),
              IconButton(
                icon: const Icon(Icons.person),
                onPressed: () => _onItemTapped(4),
                color: _selectedIndex == 4 ? Colors.blue : null,
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _onItemTapped(2),
        tooltip: 'Projects',
        child: const Icon(Icons.work),
        shape: const CircleBorder(),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
class HomeDashboard extends StatelessWidget {
  const HomeDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text(
                  'SkillLink',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Icon(Icons.notifications_none),
              ],
            ),
            const SizedBox(height: 20),
            const Text(
              'Connect & Collaborate',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            const Text(
              'Find peers and professors to expand your network and work on projects together.',
              style: TextStyle(color: Colors.grey),
            ),
            const SizedBox(height: 20),
            TextField(
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search),
                hintText: 'Search...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12.0),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Colors.grey[200],
              ),
            ),
            const SizedBox(height: 30),
            const Text(
              'People',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            ..._buildPeople(),
            const SizedBox(height: 20),
            const Text(
              'Projects',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            ..._buildProjects(),
          ],
        ),
      ),
    );
  }

  List<Widget> _buildPeople() {
    return [
      _personTile("Jenny Wilson", "Student", "Web Development, JavaScript, React", "assets/avatar1.png"),
      _personTile("Samuel Foster", "Professor", "Electrical Engineering · MATLAB", "assets/avatar2.png"),
      _personTile("Cameron Williamson", "Student", "Data Analysis, Python · R", "assets/avatar3.png"),
    ];
  }

  Widget _personTile(String name, String role, String skills, String avatar) {
    return ListTile(
      leading: const CircleAvatar(backgroundImage: AssetImage('assets/avatar_placeholder.png')), // replace with avatar if available
      title: Text(name),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(role),
          Text(skills, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        ],
      ),
      trailing: ElevatedButton(
        onPressed: () {},
        child: const Text('Connect'),
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 12),
        ),
      ),
    );
  }

  List<Widget> _buildProjects() {
    return [
      _projectTile("Machine Learning Research", "Prof. Annette Black", "Deep learning, NLP", Icons.hub),
      _projectTile("Mobile App Development", "Student Team", "Cross-platform, UI design", Icons.smartphone),
    ];
  }

  Widget _projectTile(String title, String owner, String tags, IconData icon) {
    return ListTile(
      leading: Icon(icon, size: 36, color: Colors.grey[700]),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(owner, style: const TextStyle(fontSize: 12)),
          Text(tags, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        ],
      ),
    );
  }
}
