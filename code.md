---
layout: post
title: Code
layout : landing
description: Useful snippets of code I often reuse.
image: assets/images/code.jpg
nav-menu: true
---

<!-- Main -->
<div id="main" class="alt">

<!-- One -->
<section id="one">
	<div class="inner">
		<header class="major">
			<h1>C</h1>
		</header>

<!-- Content -->
<div class="table-wrapper">
	<table class="alt">
		<thead>
			<tr>
				<th>Description</th>
				<th>Includes</th>
				<th>Code</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Pointer to start/end of an array</td>
				<td></td>
				<td>
<pre><code>#define begin(arr) (arr)
#define end(arr) ((int *)(&arr + 1) - 1)
</code></pre>
				</td>
			</tr>
			<tr>
				<td>Reinterpret cast</td>
				<td></td>
				<td>
<pre><code>#define reinterpret(value, to) ( *((to*)(&value)) )
</code></pre>
				</td>
			</tr>
			<tr>
				<td>Time of day in milliseconds</td>
				<td>sys/time.h</td>
				<td>
<pre><code>long long Time() {
	struct timeval te; 
	gettimeofday(&te, NULL);
	long long milliseconds = te.tv_sec*1000LL + te.tv_usec/1000;
	return milliseconds;
}
</code></pre>
				</td>
			</tr>
			<tr>
				<td>Read file to char*</td>
				<td>stdlib.h</td>
				<td>
<pre><code>char* loadfile(char* file, long* size)
{
	FILE* fp = fopen (file, "r");
	fseek(fp, 0L, SEEK_END);
	long lSize = ftell(fp);
	rewind(fp);
	char* buffer = calloc(1, lSize+1);
	fread(buffer, lSize, 1 ,fp);
	fclose(fp);
	*size = lSize;
	return buffer;
}
</code></pre>
				</td>
			</tr>
			<tr>
				<td>Read file to wchar_t*</td>
				<td>stdlib.h</td>
				<td>
<pre><code>wchar_t* _wloadfile(wchar_t* file, long* size)
{
	FILE* fp = _wfopen(file, L"r");
	fseek(fp, 0L, SEEK_END);
	long lSize = ftell(fp);
	rewind(fp);
	wchar_t* buffer = (wchar_t*)calloc(sizeof(wchar_t), lSize + 1);
	for (int i = 0; i < lSize; i++)
		*(buffer+i) = fgetwc(fp);
	fclose(fp);
	*size = lSize;
	return buffer;
}
</code></pre>
				</td>
			</tr>
			<tr>
				<td>Random integer in range (inclusive)</td>
				<td></td>
				<td>
<pre><code>int rand_from(int from, int to)
{
	static int seed=0;
	seed++;
	return (rand()%(to-from+1)) + from;
}
</code></pre>
				</td>
			</tr>
		</tbody>

	</table>
</div>


<!-- Two -->
<section id="two">
	<div class="inner">
		<header class="major">
			<h1>C++</h1>
		</header>

<!-- Content -->
<div class="table-wrapper">
	<table class="alt">
		<thead>
			<tr>
				<th>Description</th>
				<th>Includes</th>
				<th>Code</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Read file into std::string</td>
				<td>string <br> fstream</td>
				<td>
<pre><code>std::string Read(const std::string& path) {
	std::ifstream input_file(path);
	return std::string((std::istreambuf_iterator&lt;char&gt;(input_file)), std::istreambuf_iterator&lt;char&gt;());
}</code></pre>
				</td>
			</tr>
			<tr>
				<td>Time of day in milliseconds</td>
				<td>time <br> chrono</td>
				<td>
<pre><code>int Time() {
	return std::chrono::duration_cast&lt;std::chrono::milliseconds&gt;(std::chrono::system_clock::now().time_since_epoch()).count();
}</code></pre>
				</td>
			</tr>
			<tr>
				<td>Loop over all elements in an std::map</td>
				<td>map</td>
				<td>
<pre><code>for (auto const& x : MAPNAME)
{
	//x.first = key
	//x.second = value
}</code></pre>
				</td>
			</tr>
		</tbody>

	</table>
</div>


<!-- Three-->
<section id="three">
	<div class="inner">
		<header class="major">
			<h1>Other Useful Libraries</h1>
		</header>

<!-- Content -->
External libraries (not my own) that I often use.
<div class="table-wrapper">
	<table class="alt">
		<thead>
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Link</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>OFFD</td>
				<td>C library to open the file dialog window.</td>
				<td><a href="https://github.com/JoshuaManton/offd">Github</a></td>
			</tr>
			<tr>
				<td>cImGui</td>
				<td>A C wrapper for the ImGui library (orignally in C++).</td>
				<td><a href="https://github.com/cimgui/cimgui">Github</a></td>
			</tr>
		</tbody>

	</table>
</div>